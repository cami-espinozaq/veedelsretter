import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "IBM Plex Sans"
  }
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={THEME}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
