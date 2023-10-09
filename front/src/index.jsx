import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConnectProvider } from './components/connection/ConnectedContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConnectProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConnectProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
