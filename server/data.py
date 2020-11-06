from typing import NamedTuple
from datetime import datetime
import calendar

class Retailer(NamedTuple):
    id: int
    name: str
    approved_at: datetime
    amount: int
    orders_count: int
    soli: int
    voucher_count: int
    redeemed_voucher_count: int


class Retailers():
    def __init__(self, data):
        self.raw_data = data
        self.retailers = self._parse_data()

    def _parse_data(self):
        retailers = {}

        for i, r in enumerate(self.raw_data):
            retailers[i] = Retailer(
                id=i,
                name=r.get('name'),
                approved_at=r.get('approved_at'),
                amount=r.get('amount'),
                orders_count=r.get('orders_count'),
                soli=r.get('soli'),
                voucher_count= self._parse_if_int(r.get('voucher_count')),
                redeemed_voucher_count= self._parse_if_int(r.get('redeemed_voucher_count'))
            )
        return retailers

    def _parse_if_int(self, value: str):
        try:
            return int(value)
        except TypeError:
            return None

    def _retailers_list(self):
        return list(self.retailers.values())

    def names_list(self):
        return [dict(name=r.name, id=r.id) for r in self._retailers_list()]

    def totals_overview(self):

        def _sum_all(kpi):
            return sum(getattr(r, kpi) or 0 for r in self._retailers_list())

        donations = _sum_all('soli')
        sold = _sum_all('amount') - donations
        avg_per_order = (_sum_all('amount') / _sum_all('orders_count'))

        return {
            'vouchersSold': _sum_all('voucher_count'),
            'vouchersRedeemed': _sum_all('redeemed_voucher_count'),
            'donations': donations,
            'vouchersAmount': sold,
            'avgAmountPerOrder': round(avg_per_order, 2),
            'approvalValues': self.monthly_retailers_approval()
        }

    def overview_by_id(self, id):
        retailer_info = self.retailers.get(id)
        if retailer_info:
            donations = retailer_info.soli

            return {
                'vouchersSold': retailer_info.voucher_count,
                'vouchersRedeemed': retailer_info.redeemed_voucher_count,
                'donations': donations,
                'vouchersAmount': retailer_info.amount - donations,
                'orders': retailer_info.orders_count
            }
        return None

    def retailer_by_id(self, id):
        retailer_info = self.retailers.get(id)
        return retailer_info._asdict() if retailer_info else None

    def monthly_retailers_approval(self):
        all_dates = dict()
        for r in self._retailers_list():
            # "2020-03-28T19:50:34Z"
            date = r.approved_at
            date_format = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S%fZ')
            wk = date_format.strftime('%U')

            if wk in all_dates:
                all_dates[wk] += 1
            else:
                all_dates[wk] = 1

        return [dict(date=k, value=v) for k, v in all_dates.items()]

    def compare_to_average(self, id):
        totals = self.totals_overview()
        num_retailers = len(self.retailers.keys())
        avg_donations = totals['donations'] / num_retailers
        avg_amount = totals['vouchersAmount'] / num_retailers

        avg_redeemed_vouchers = totals['vouchersRedeemed'] / num_retailers
        avg_pending_vouchers = (totals['vouchersSold'] - totals['vouchersRedeemed']) / num_retailers

        totals_data = {
            'revenue': [{
                'key': 'Avg. retailers', 
                'donations': round(avg_donations, 2), 
                'vouchersAmount': round(avg_amount, 2)
                }],
            'counting': [{
                'key': 'Avg. retailers', 
                'pendingVouchers': round(avg_pending_vouchers, 1), 
                'redeemedVouchers': round(avg_redeemed_vouchers, 1)
                }]
        }

        if not id:
            return totals_data

        retailer_info = self.retailers.get(int(id))
        r_donations = retailer_info.soli
        r_amount = retailer_info.amount - r_donations
        r_redeemed_vouchers = retailer_info.redeemed_voucher_count
        r_pending_vouchers = retailer_info.voucher_count - r_redeemed_vouchers

        totals_data['revenue'].append({
            'key': retailer_info.name, 
            'donations': r_donations, 
            'vouchersAmount': r_amount
        })
        totals_data['counting'].append({
            'key': retailer_info.name, 
            'pendingVouchers': r_pending_vouchers, 
            'redeemedVouchers': r_redeemed_vouchers
        })

        return totals_data

    def retailer_ranking(self, id):
        r_list = self._retailers_list()
        rankings = dict()
        id = int(id)

        total_amount = sorted(r_list, key=lambda r: r.amount, reverse=True)
        ranking = next((index for (index, r) in enumerate(total_amount) if r.id == id))
        rankings['totalAmount'] = ranking

        voucher_amount = sorted(r_list, key=lambda r: r.amount - r.soli, reverse=True)
        ranking = next((index for (index, r) in enumerate(voucher_amount) if r.id == id))
        rankings['voucherAmount'] = ranking

        soli_amount = sorted(r_list, key=lambda r: r.soli, reverse=True)
        ranking = next((index for (index, r) in enumerate(soli_amount) if r.id == id))
        rankings['donations'] = ranking

        return rankings
