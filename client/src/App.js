import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard'
import AddOutlet from './Components/Outlet/AddOutlet'


function App() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/outlet/add" component={AddOutlet} exact />


    </Switch>
  );
}

export default App;
