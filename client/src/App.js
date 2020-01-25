import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AddOutlet from "./Components/Outlet/AddOutlet";
import ViewOutlet from "./Components/Outlet/ViewOutlet";
import EditOutlet from "./Components/Outlet/EditOutlet";

function App() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/outlet/add" component={AddOutlet} exact />
      <Route path="/outlet/view" component={ViewOutlet} exact />
      <Route path="/outlet/edit/:slug" component={EditOutlet} exact />
    </Switch>
  );
}

export default App;
