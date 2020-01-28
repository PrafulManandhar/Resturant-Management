import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AddOutlet from "./Components/Outlet/AddOutlet";
import ViewOutlet from "./Components/Outlet/ViewOutlet";
import EditOutlet from "./Components/Outlet/EditOutlet";
import AddCategory from './Components/Category/AddCategory'
import EditCategory from './Components/Category/EditCategory'
import ViewCategory from './Components/Category/ViewCategory'
import AddMenu from './Components/Menu/AddMenu'
import ViewMenu from './Components/Menu/ViewMenu'
import EditMenu from './Components/Menu/EditMenu'


function App() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/outlet/add" component={AddOutlet} exact />
      <Route path="/outlet/view" component={ViewOutlet} exact />
      <Route path="/outlet/edit/:slug" component={EditOutlet} exact />
      <Route path="/category/add" component={AddCategory} exact />
      <Route path="/category/view" component={ViewCategory} exact />
      <Route path="/categories/edit/:slug" component={EditCategory} exact />
      <Route path="/menu/add" component={AddMenu} exact />
      <Route path="/menu/view" component={ViewMenu} exact />
      <Route path="/menu/edit/:slug" component={EditMenu} exact />

    </Switch>
  );
}

export default App;
