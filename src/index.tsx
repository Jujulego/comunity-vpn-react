import React from 'react';
import { render } from 'react-dom';

import { CssBaseline, StylesProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import { persistor, store } from 'store';

import 'typeface-roboto';
import 'index.css';

// Application
render((
  <StylesProvider injectFirst>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StylesProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
