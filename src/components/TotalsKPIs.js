import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import KpiBox from './KpiBox';

import LoyaltyIcon from '@material-ui/icons/Loyalty';
import RedeemIcon from '@material-ui/icons/Redeem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReceiptIcon from '@material-ui/icons/Receipt';

import { Chart, LineSeries, ArgumentAxis, ValueAxis, Tooltip, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const TotalsKPIs = params => {

    const [totals, setTotals] = useState(null);

    const fetchData = async () => {
      try {

        const baseURL = process.env.REACT_APP_API_URL || '';
        const result = await axios(`${baseURL}/overview`);
        setTotals(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
        fetchData();
    }, []);

    const toCurrency = (number) => `${(number / 100).toFixed(2)} €`;

    const totalsView = totals ? (
        <Fragment>
            <KpiBox kpiStyle="kpiBox--lightBlue" number={totals.vouchersSold} title="Number of vouchers sold">
              <CardMembershipIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--lightBlue" number={totals.vouchersRedeemed} title="Number of vouchers redeemed">
                <RedeemIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <Chart data={totals.approvalValues || []} height="350">
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="value" argumentField="date" color="#1F628C" name="week number (2020)" />
                <Legend position="bottom" />
                <Title text="Number of new retailers approved weekly" />
                <EventTracker />
                <Tooltip />
            </Chart>
            <KpiBox kpiStyle="kpiBox--lightBlue" number={toCurrency(totals.donations)} title="Income from donations">
                <LoyaltyIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--lightBlue" number={toCurrency(totals.vouchersAmount)} title="Income from sold vouchers">
                <MonetizationOnIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--lightBlue" number={toCurrency(totals.avgAmountPerOrder)} title="Average Amount per Order">
                <ReceiptIcon style={{ fontSize: 80 }} />
            </KpiBox>
        </Fragment>
    ) : null;

    return (
        <Grid item sm={4} xs={12}>
          <Paper elevation={4}>
            <Box display="flex" flexDirection="column" padding="20px">
                <Typography variant="h4" className="grid-item__title">
                    Total KPIs Analysis
                </Typography>
                {totalsView}
            </Box>
          </Paper>
        </Grid>
    );
}

export default TotalsKPIs;