import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import classnames from "classnames";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Routes from "../../config/Route";
import validateMenu from "../../Validation/Admin/MenuValidation";
import Modal from "../../UI/Modal/messageModal";
import Navbar from "../Navbar";
export default class AddMenu extends Component {
  state = {
    loading: false,
    show: false,
    message: "",
    category: "",
    errors: "",
    MName: "",
    MCategory: "",
    Price: "",
    MStatus: "",
    Cost_Price: "",
    Description: "",
    categories: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  componentDidMount = async () => {
    // let isAuthorized = await checkPermission(SLUGS.ADD_CATEGORIES);
    // if (!isAuthorized) {
    //   this.props.history.replace(Routes.UNAUTHORIZED);
    // }
    // this.setState({ ip: await getIp() });

    await axios
      .get("http://localhost:5000/api/Category/categories")
      .then(results => {
        console.log("categoryie", results.data.data);
        this.setState({ categories: results.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  AddMenus = async e => {
    e.preventDefault();
    let data = {
      MName: this.state.MName,
      MCategory: this.state.MCategory,
      Price: this.state.Price,
      MStatus: this.state.MStatus,
      Cost_Price: this.state.Cost_Price,
      Description: this.state.Description
    };
    console.log(data);
    const { errors, isValid } = validateMenu(data);
    if (isValid) {
      await axios
        .post("http://localhost:5000/api/Menu/menu/add", data)
        .then(res => {
          if (res.data.type === "success") {
            this.setState(
              {
                message: res.data.message,
                alertVariant: "success",
                errors: ""
              },
              () => {
                this.showAlerts();
                console.log(res.data)
              }
            );
          } else if (res.data.errors) {
            this.setState({ errors: res.data.errors });
          } else {
            this.setState({
              message: res.data.message,
              alertVariant: "danger"
            },
            () => {
              this.showAlerts();
            });
          }
        })
        .catch(err => {
          alert("ERRR",err);

          this.setState({ errors: err.response.data.errors }, () => {
            console.log(this.state.errors);
          });
        });
    } else {
      this.setState({ errors });
    }
  };

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };

  render() {
    let { errors } = this.state;
    let display = <Spinner />;
    const categoriesOptions = [];
    if (!this.state.loading) {
      let categories = this.state.categories;
      for (let category of categories) {
        categoriesOptions.push(
          <option key={category.id} value={category.id}>
            {category.cnames}
          </option>
        );
      }
      if (!this.state.loading)
        display = (
          <>
            <Navbar />
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <div className="mt-2">
                    <h2>Add Menu</h2>
                  </div>
                  <hr />
                  <Card>
                    <Card.Body>
                      <h5>Add Menu</h5>
                      <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                        Use this form to add new menu
                      </p>
                      <Form onSubmit={this.AddMenus}>
                        <Form.Group>
                          <Row>
                            <Col md="4">
                              <Form.Label>Menu Name</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.MName
                                })}
                                type="text"
                                placeholder="Menu Name"
                                name="MName"
                                onChange={this.changeHandler}
                              />

                              <Form.Control.Feedback type="invalid">
                                {errors.MName}
                              </Form.Control.Feedback>
                            </Col>
                            <Col md="4">
                              <Form.Label>Menu Category</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.MCategory
                                })}
                                as="select"
                                name="MCategory"
                                onChange={this.changeHandler}
                              >
                                <option value="">Select a Menu Category</option>
                                {categoriesOptions}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors.MCategory}
                              </Form.Control.Feedback>
                            </Col>
                            <Col md="4">
                              <Form.Label>Menu Status</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.MStatus
                                })}
                                as="select"
                                name="MStatus"
                                onChange={this.changeHandler}
                              >
                                <option value="">Select a Menu Category</option>
                                <option value="available">Available</option>

                                <option value="Stock-out">Stock Out</option>
                              </Form.Control>

                              <Form.Control.Feedback type="invalid">
                                {errors.measurementUnit}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col md="4">
                              <Form.Label>Cost Price</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Cost Price"
                                name="Cost_Price"
                                onChange={this.changeHandler}
                              />

                              {/* <Form.Control.Feedback type="invalid">
                              {errors.costPrice}
                            </Form.Control.Feedback> */}
                            </Col>
                            <Col md="4">
                              <Form.Label> Price</Form.Label>
                              <Form.Control
                                className={classnames({
                                  "is-invalid": errors.Price
                                })}
                                type="number"
                                placeholder="Price"
                                name="Price"
                                onChange={this.changeHandler}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.Price}
                              </Form.Control.Feedback>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Col md="8">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows="10"
                                name="Description"
                                onChange={this.changeHandler}
                              />
                            </Col>
                          </Row>
                        </Form.Group>

                        <Form.Group>
                          <Row>
                            <Col>
                              <Button
                                className="col-sm-2"
                                variant="primary"
                                type="submit"
                              >
                                Add Menu
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Modal
              show={this.state.show}
              close={this.modalClose}
              variant={this.state.alertVariant}
              message={this.state.message}
            />
          </>
        );

      return <>{display}</>;
    }
  }
}
// const mapActionToProps = dispatch => ({
//   login: () => dispatch(login()),
//   auth: payload => dispatch(auth(payload))
// });
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(Addcategory));
