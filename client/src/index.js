import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./CombineReducer";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./Bootstrap/css/sb-admin-2.css";
import "./Bootstrap/vendor/fontawesome-free/css/all.min.css";
import "./Bootstrap/css/custom.css";
import "./Bootstrap/css/datatable.css";
const initialState = {};

// import "../src/stylesheets/theme.css";
// import "../src/stylesheets/skins/default.css";
// import "../src/stylesheets/theme-custom.css";
const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <Router>
      <App />{" "}
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
