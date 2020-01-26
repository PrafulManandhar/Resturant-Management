import React, { Component } from "react";
import { Link } from "react-router-dom";
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

export default class Navbars extends Component {
  state = {
    navItem: "admin"
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
              <NavDropdown title="Outlet" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <Link to="/outlet/add" className="navbar-button">
                    Add Outlet
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <Link to="/outlet/view" className="navbar-button">
                    View Outlet
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <Link to="/category/add" className="navbar-button">
                    Add Category
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <Link to="/category/view" className="navbar-button">
                    View Category
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {" "}
                  <Link to="/menu/add" className="navbar-button">
                    Add Menu
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <Link to="/menu/view" className="navbar-button">
                    View Menu
                  </Link>
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
                <Link to="/outlet/add" className="navbar-button">
                  Front Desk
                </Link>
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
                <Link to="/outlet/add" className="navbar-button">
                  View Today Sales
                </Link>
              </NavDropdown.Item>
        
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
   
      );
    }

    return (
      <Col>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Pragya Newari Khaja Ghar</Navbar.Brand>
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
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col>{navbarSecondary}</Col>
        </Row>
      </Col>
    );
  }
}
