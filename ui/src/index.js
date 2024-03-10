import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <Provider store={store}>
        <Router>
        <Auth0Provider
    domain="dev-qo74p3sjcgxt63ce.us.auth0.com"
    clientId="s94zUG871ruAdc4BLF7ZUifVSLIQdFSe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
            {/* <Auth0Provider> */}
                <App />
            </Auth0Provider>
        </Router>
    </Provider>,
    document.getElementById('root')
);
