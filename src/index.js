import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app.jsx";
import configureStore from "./store/store";
import { verifyCredentials } from "./actions/reduxAuthActions";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();
verifyCredentials(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
