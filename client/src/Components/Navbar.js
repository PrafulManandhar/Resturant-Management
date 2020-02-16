import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Img from "../Image/profile.jpg";
import { logout } from "../Action/loginAction";
import axios from "axios";
import getIp from "../Utility/getIp";
import { connect } from "react-redux";
import CustomName from '../config/CustomName';

import {
  Nav,
  Col,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Navbar,
  Row
} from "react-bootstrap";
import "../CustomStyle/customCss.css";

class Navbars extends Component {
  state = {
    navItem: "admin",
    ip: null,
    message: "",
    show: false
  };
  componentDidMount = async () => {
    this.setState({ ip: await getIp() });
  };
  logout = () => {
    axios
      .post("http://localhost:5000/api/users/logout", {
        ip: this.state.ip,
        email: this.state.email
      })
      .then(res => {
        if (res.data.type === "success") {
          this.setState({ message: res.data.message });
          localStorage.clear();
          this.props.logout();
          this.props.history.replace("/");
        } else if (res.data.type === "error") {
          this.setState({ message: res.data.message }, () => this.showAlerts());
        }
      });
  };

  showAlert = () => {
    this.setState({ show: true }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 2000);
    });
  };

  showAlerts = () => {
    this.setState({ show: true }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    });
  };
  toggleSidebar = () => {
    document.querySelector("#accordionSidebar").classList.toggle("toggled");
  };

  render() {
    const clickedItem = this.state.navItem;
    let navbarSecondary;
    if (clickedItem === "admin") {
      navbarSecondary = (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Setup</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Manage User" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/user/add" className="navbar-button">
                    Add User
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/user/view" className="navbar-button">
                    View User
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Outlet" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/outlet/add" className="navbar-button">
                    Add Outlet
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/outlet/view" className="navbar-button">
                    View Outlet
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/category/add" className="navbar-button">
                    Add Category
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/category/view" className="navbar-button">
                    View Category
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/menu/add" className="navbar-button">
                    Add Menu
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/menu/view" className="navbar-button">
                    View Menu
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (clickedItem === "front") {
      navbarSecondary = (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Front</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Front" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/frontdesk/show" className="navbar-button">
                    Front Desk
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (clickedItem === "account") {
      navbarSecondary = (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Account</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <NavLink to="/outlet/add" className="navbar-button">
                    View Today Sales
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

    return (
      <Col>
        <Navbar expand="lg" style={{ backgroundColor: "#17a2b8" }}>
    <NavLink to="/"> <Navbar.Brand>{CustomName.RESTURANT_NAME}</Navbar.Brand></NavLink> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                {" "}
                <button onClick={() => this.setState({ navItem: "admin" })}>
                  Setup
                </button>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <button onClick={() => this.setState({ navItem: "front" })}>
                  Front
                </button>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <button onClick={() => this.setState({ navItem: "account" })}>
                  Account
                </button>
              </Nav.Link>
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <ul className="navbar-nav ml-auto">
              {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}

              <div className="topbar-divider d-none d-sm-block" />

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#d"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small" >
                    {/* TODo Should give the name or the role of the user(admin / user ) */}
                  Admin                  {/* {Roles[this.state.role - 1]} */}
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src={Img}
                    alt="profile"
                  />
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <NavLink className="dropdown-item" to="/profile">
                    <i className="fas fa-user mr-2 text-gray-400" />
                    Profile
                  </NavLink>
                  {/* <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a> */}
                  {/* <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a> */}
                  <div className="dropdown-divider" />

                  <button className="dropdown-item" onClick={this.logout}>
                    <i className="fas fa-sign-out mr-2 text-gray-400" />
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col>{navbarSecondary}</Col>
        </Row>
      </Col>
    );
  }
}

const mapActionToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = state => ({
  Userdata: state.auth
});

export default connect(mapStateToProps, mapActionToProps)(withRouter(Navbars));
