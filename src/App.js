import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import './App.css';
import logo from './assets/images/logo-negativ.png';

import RetailerKPIs from './components/RetailerKPIs';
import TotalsKPIs from './components/TotalsKPIs';
import CompareKPIs from './components/CompareKPIs';

function App() {

  const [retailerId, setRetailerId] = useState(null);

  const handleCallback = (id) => {
    setRetailerId(id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Box display="flex" justifyContent="space-between" height="2.5rem">
          <img src={logo} alt="Logo" className="App-logo" />
        </Box>
      </header>
      <div className="main-grid">
        <Grid container spacing={3}>
          <RetailerKPIs selectedCallback={handleCallback} />
          <TotalsKPIs />
          <CompareKPIs retailerId={retailerId} />
        </Grid>
      </div>
      <footer>
      </footer>
    </div>
  );
}

export default App;
