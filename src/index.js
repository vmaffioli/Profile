import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import './reset.css';
import App from './pages/Home/App';
import Work from './pages/Work';

import Thumb from './assets/img/thumb.png';




ReactDOM.render(
  
  <React.StrictMode>
    
    <MetaTags>
      
        <title>Vinícius Maffioli</title>
        <meta name="description" content="My Web Profile made with React.js" />
        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
        <meta name="author" content="Vinícius Maffioli" />
        <meta property="og:image" content={Thumb} />
        
    </MetaTags>

    <BrowserRouter>


      <Switch>
          
          <Route path="/" component={App} exact />
          <Route path="/work" component={Work}  />    


      </Switch>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
