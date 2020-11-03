import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import RetailerSelect from './components/Select';
import KpiBox from './components/KpiBox';

import LoyaltyIcon from '@material-ui/icons/Loyalty';
import RedeemIcon from '@material-ui/icons/Redeem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';

import './App.css';
import logo from './assets/images/logo-negativ.png';
import { Typography } from '@material-ui/core';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Box display="flex" justifyContent="space-between" height="2.5rem">
          <img src={logo} alt="Logo" className="App-logo" />
        </Box>
      </header>
      <div className="main-grid">
        <Grid container spacing={3}>
          <GridItem title="Retailer relevant KPIs">
            <RetailerSelect />
            <KpiBox kpiStyle="kpiBox--green" number={123456} title="Number of vouchers sold">
              <CardMembershipIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={12456} title="Number of vouchers redeemed">
              <RedeemIcon style={{ fontSize: 80 }} />
            </KpiBox>
            <KpiBox kpiStyle="kpiBox--green" number={"120056 €"} title="Amount of Donations">
              <LoyaltyIcon style={{ fontSize: 80 }} />
            </KpiBox>
          </GridItem>
          <GridItem title="Total KPIs Analysis">
            <KpiBox kpiStyle="kpiBox--lightBlue" number={65893257} title="Total number of vouchers sold">
              <CardMembershipIcon style={{ fontSize: 80 }} />
            </KpiBox>
          </GridItem>
          <GridItem title="Retailer's performance">
          
          </GridItem>
        </Grid>
      </div>
      <footer>
      </footer>
    </div>
  );
}

export default App;


const GridItem = params => {
  return (
    <Grid item xs={4}>
      <Paper elevation={4}>
        <Box display="flex" flexDirection="column" padding="20px">
          <Typography variant="h4" className="grid-item__title">{params.title}</Typography>
          {params.children}
        </Box>
      </Paper>
    </Grid>
  )
}