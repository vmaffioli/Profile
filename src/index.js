import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter, Switch, Route} from 'react-router-dom';

import './reset.css';
import App from './pages/Home/App';
import Work from './pages/Work';



ReactDOM.render(
  <React.StrictMode>
    <HashRouter>

      <Switch>
          
          <Route path="/" component={App} exact />
          <Route path="/work" component={Work}  />    

      </Switch>
      
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
