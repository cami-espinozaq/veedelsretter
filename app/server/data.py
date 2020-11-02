from typing import NamedTuple
from datetime import datetime

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

        return {
            'vouchers_sold': _sum_all('voucher_count'),
            'vouchers_redeemed': _sum_all('redeemed_voucher_count'),
            'donations': donations,
            'vouchers_amount': _sum_all('amount') - donations,
            'orders': _sum_all('orders_count')
        }

    def overview_by_id(self, id):
        retailer_info = self.retailers.get(id)
        if retailer_info:
            donations = retailer_info.soli

            return {
                'vouchers_sold': retailer_info.voucher_count,
                'vouchers_redeemed': retailer_info.redeemed_voucher_count,
                'donations': donations,
                'vouchers_amount': retailer_info.amount - retailer_info.soli,
                'orders': retailer_info.orders_count
            }
        return None

    def retailer_by_id(self, id):
        retailer_info = self.retailers.get(id)
        return retailer_info._asdict() if retailer_info else None