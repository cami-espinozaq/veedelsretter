import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import KpiBox from './KpiBox';

import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MoneyIcon from '@material-ui/icons/Money';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { Chart, BarSeries, ArgumentAxis, ValueAxis, Tooltip, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, Stack, ArgumentScale } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';

const CompareKPIs = params => {

    const [revenueData, setrevenueData] = useState([]);
    const [vouchersData, setVouchersData] = useState([]);
    const [rankingData, setRankingData] = useState(null);
    const id = params.retailerId;

    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/compare`, {params: {id: id}});
      const formattedRev = formatData(result.data.revenueGraph, 'donations', 'vouchersAmount');
      const formattedVouchers = formatData(result.data.countGraph, 'pendingVouchers', 'redeemedVouchers');
      
      setrevenueData(formattedRev);
      setVouchersData(formattedVouchers);
      setRankingData(result.data.ranking);
    }
  
    useEffect(() => {
        fetchData();
    }, [id]);

    const floatCurrency = (number) => Math.round(number / 100);
    const toRanking = (number => `#${number}`)

    const formatData = (rData) => rData.map((item) => {
        for (let k in rData) {
            if (k !== 'key') {
                item[k] = floatCurrency(item[k])
            }
        }
        return item
    });

    const rankingView = (r) => (
        <Fragment>
            <KpiBox kpiStyle="kpiBox--yellow" number={toRanking(r.totalAmount)} title="Ranking by total amount">
                <MoneyIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--yellow" number={toRanking(r.donations)} title="Ranking by donations">
                <LoyaltyIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--yellow" number={toRanking(r.voucherAmount)} title="Ranking by vouchers sold">
                <LocalOfferIcon style={{ fontSize: 80 }} />
            </KpiBox>
        </Fragment>
    )
         
    return (
        <Grid item sm={4} xs={12}>
          <Paper elevation={4}>
            <Box display="flex" flexDirection="column" padding="20px">
                <Typography variant="h4" className="grid-item__title">
                    Retailer's performance
                </Typography>
                <Chart data={revenueData} height="300">
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries color="#2E5CD1" valueField="donations" argumentField="key" name="Donations" />
                    <BarSeries color='#FFE37E' valueField="vouchersAmount" argumentField="key" name="Sold Vouchers" />
                    <Legend position="right" />
                    <Title text="Income from donations and vouchers (€)" />
                    <EventTracker />
                    <Tooltip />
                    <Stack />
                </Chart>
                <br />
                {rankingData ? rankingView(rankingData) : null}
                <Chart data={vouchersData} height="300">
                    <ArgumentScale factory={scaleBand} />
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries color="#2E5CD1" valueField="redeemedVouchers" argumentField="key" name="Redeemed" />
                    <BarSeries color='#FFE37E' valueField="pendingVouchers" argumentField="key" name="Pending" />
                    <Legend position="right" />
                    <Title text="Total and Redeemed Vouchers" />
                    <EventTracker />
                    <Tooltip />
                    <Stack stacks={[ {series: ['Redeemed', 'Pending']} ]} />
                </Chart>
            </Box>
          </Paper>
        </Grid>
    );
}

export default CompareKPIs;