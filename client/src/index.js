import React from 'react';
import './assets/scss/index.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import RoutesDom from './router';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import {store} from './data/data'
import $ from "jquery";
window.$ = $
window.jQuery = window.$

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <RoutesDom></RoutesDom>   
        </StyledEngineProvider>
      </HelmetProvider>
    </Provider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();