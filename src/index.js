import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app.jsx";
import configureStore from "./store/store";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();
window.store = store;
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
