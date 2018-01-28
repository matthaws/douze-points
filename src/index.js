import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store.js";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configure } from "redux-auth";
import App from "./components/app.jsx";
import "./index.css";

const store = configureStore();
const renderApp = async ({ cookies, isServer, currentLocation } = {}) => {
  const configuration = await store.dispatch(
    configure(
      { apiUrl:                  'https://devise-token-auth.dev',
        signOutPath:             '/auth/sign_out',
        emailSignInPath:         '/auth/sign_in',
        emailRegistrationPath:   '/auth',
        accountUpdatePath:       '/auth',
        accountDeletePath:       '/auth',
        passwordResetPath:       '/auth/password',
        passwordUpdatePath:      '/auth/password',
        tokenValidationPath:     '/auth/validate_token',
        authProviderPaths: {
          facebook:  '/auth/facebook',
          google:    '/auth/google_oauth2'
        }
      },
      { isServer: false, cookies, currentLocation, clientOnly: true }
    )
  );
  if (configuration.blank) {
    return <noscript />;
  } else {
    return (
      <Provider store={store} key="provider">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
};

const douzePoints = async () => {
  const appComponent = await renderApp();
  const root = window.document.getElementById("root");
  ReactDOM.render(appComponent, root);
  registerServiceWorker();
};

douzePoints();
