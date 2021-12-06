import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignedInPage from './SignedInPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*const rooteElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
    <switch>
      <Route path = "/"></Route>
      <Route path = "/SignedInPage"></Route>
    </switch>
    </BrowserRouter>,
  rooteElement
);*/