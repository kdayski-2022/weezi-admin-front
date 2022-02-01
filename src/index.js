import React from 'react';
import ReactDOM from 'react-dom';

import './evorich.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const template = process.env.REACT_APP_TEMPLATE || 'academy'
import( `./${template}.css`)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
