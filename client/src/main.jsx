import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </Provider>
);