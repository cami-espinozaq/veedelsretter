import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import RetailerSelect from './Select';
import KpiBox from './KpiBox';

import LoyaltyIcon from '@material-ui/icons/Loyalty';
import RedeemIcon from '@material-ui/icons/Redeem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DeckTwoToneIcon from '@material-ui/icons/DeckTwoTone';


const RetailerKPIs = params => {

    const [retailer, setRetailer] = useState(null);
    const [retailersList, setRetailersList] = useState([]);

    const fetchRetailer = async (id) => {
        try {
            const result = await axios(`http://localhost:5000/overview/${id}`);
            setRetailer(result.data);
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleRetailerChange = (retailerId) => {
        if (retailerId) {
            fetchRetailer(retailerId);
        } else {
            setRetailer(null);
        }
        params.selectedCallback(retailerId);
    };

    const fetchList = async () => {
        try {
            const result = await axios('http://localhost:5000/names-list');
            setRetailersList(result.data);
        } catch (error) {
            console.log(error);
        }
      
    }
  
    useEffect(() => {
      fetchList();
    }, []);

    const toCurrency = (number) => `${(number / 100).toFixed(2)} €`;

    const retailerView = (r) => (
        <Box>
            <KpiBox kpiStyle="kpiBox--green" number={r.vouchersSold} title="Number of vouchers sold">
              <CardMembershipIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={r.vouchersRedeemed} title="Number of vouchers redeemed">
                <RedeemIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={toCurrency(r.donations)} title="Income from donations">
                <LoyaltyIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={toCurrency(r.vouchersAmount)} title="Income from sold vouchers">
                <MonetizationOnIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={r.orders} title="Number of orders">
                <ReceiptIcon style={{ fontSize: 80 }} />
            </KpiBox>
        </Box>
    );

    const chooseRetailerView = (
        <Box margin="30px auto">
            <DeckTwoToneIcon style={{ fontSize: 80 }} />
            <Typography variant="h5" style={{ marginBottom: '10px', fontStyle: 'italic' }}>
                Please choose a retailer from dropdown
            </Typography>
        </Box>
    )

    return (
        <Grid item sm={4} xs={12}>
          <Paper elevation={4}>
            <Box display="flex" flexDirection="column" padding="20px" 
            justifyContent="space-between" maxHeight={retailer ? 'calc(100% - 40px)' : 'unset'}>
                <Typography variant="h4" className="grid-item__title">Retailer relevant KPIs</Typography>
                <Box>
                    <Typography variant="h5" style={{ fontStyle: 'italic', margin: '20px 0' }}>
                        Please select a retailer to see both their main KPIs and their performance compared to the average of all approved retailers so far. 
                    </Typography>
                    <br />
                    <RetailerSelect list={retailersList} onChangeCallback={handleRetailerChange} />
                    <br />
                    {retailer ? retailerView(retailer) : chooseRetailerView}
                </Box>
            </Box>
          </Paper>
        </Grid>
    );
}

export default RetailerKPIs;