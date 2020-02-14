import React,{Component} from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "./Action/loginAction";
import { withRouter } from "react-router-dom";
import AddUser from './Components/Users/AddUser';
import EditUser from './Components/Users/EditUser';
import ViewUser from './Components/Users/ViewUser';
import Dashboard from "./Components/Dashboard";
import AddOutlet from "./Components/Outlet/AddOutlet";
import ViewOutlet from "./Components/Outlet/ViewOutlet";
import EditOutlet from "./Components/Outlet/EditOutlet";
import AddCategory from "./Components/Category/AddCategory";
import EditCategory from "./Components/Category/EditCategory";
import ViewCategory from "./Components/Category/ViewCategory";
import AddMenu from "./Components/Menu/AddMenu";
import ViewMenu from "./Components/Menu/ViewMenu";
import EditMenu from "./Components/Menu/EditMenu";
import Login from "./Components/login/login";
import Routes from "./config/Route";
import CustomSpinner from "./UI/Spinner/CustomSpinner";

class App extends Component {
  render() {
    console.log(this.props.loginData.login)
    return (
      <Switch>
        <Route path={Routes.MAIN_LOGIN} component={Login} exact />

        <Route
          path={Routes.DASHBOARD}
          exact
          render={() => (this.props.loginData.login ? <Dashboard /> : <CustomSpinner />)}
        />
         <Route
          path={Routes.ADD_USER}
          exact
          render={() => (this.props.loginData.login ? <AddUser /> : <CustomSpinner />)}
        />
         <Route
          path={Routes.VIEW_USER}
          exact
          render={() => (this.props.loginData.login ? <ViewUser /> : <CustomSpinner />)}
        />
        {/* <Route path="/dashboard" component={Dashboard} exact /> */}
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
}

const mapActionToProps = dispatch => ({
  login: () => dispatch(login())
});

const mapStateToProps = state => ({
  loginData: state.login
});

export default connect(mapStateToProps, mapActionToProps)(App);
