import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navbar extends Component {
  state = {
    navItem: "admin"
  };
  render() {
    const clickedItem = this.state.navItem;
    let navbarSecondary;
    if (clickedItem === "admin") {
      navbarSecondary = (
        <div className="navbar-inner">
          <Link to="/outlet/add" className="navbar-button">
            Outlet
          </Link>
          <Link to="/Category" className="navbar-button">
            Category
          </Link>
          <Link to="/menu" className="navbar-button">
            Menu
          </Link>
        </div>
      );
    }else if(clickedItem === "front"){
        navbarSecondary = (
            <div className="navbar-inner">
              <Link to="/frontdesk" className="navbar-button">
                Front Desk 
              </Link>
              <Link to="/Category" className="navbar-button">
                Category
              </Link>
              <Link to="/menu" className="navbar-button">
                Menu
              </Link>
            </div>
          );
    }else if(clickedItem === "account"){
        navbarSecondary = (
            <div className="navbar-inner">
              <Link to="/sales" className="navbar-button">
                Sales
              </Link>
              <Link to="/purchase" className="navbar-button">
                Purchase
              </Link>
             
            </div>
          );
        
    }

    return (
      <div className="navbar-outer">
        <div className="navbar-inner">
          <button onClick={() => this.setState({ navItem: "admin" })}>
            Setup
          </button>
          <button onClick={() => this.setState({ navItem: "front" })}>
            Front
          </button>
          <button onClick={() => this.setState({ navItem: "account" })}>
            Account
          </button>
        </div>
        {navbarSecondary}
      </div>
    );
  }
}
