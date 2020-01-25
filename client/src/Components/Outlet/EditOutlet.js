import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Spinner from "../../UI/Spinner/Spinner";
import Navbar from '../Navbar'
import Modal from "../../UI/Modal/messageModal";
import validateOutlet from "../../Validation/Admin/OutletValidation";

import classnames from "classnames";

export default class EditOutlet extends Component {
  state = {
    loading: true,
    show: false,
    message: "",
    outlet: "",
    errors: "",
    alertVariant: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, errors: "" });
  };

  componentDidMount = async () => {
      let slug = this.props.match.params.slug;
      console.log(slug)
    await axios
      .get(
        `http://localhost:5000/api/order/outlet/${this.props.match.params.slug}`
      )
      .then(res => {
        if (res.data.type === "error") {
          this.setState(
            {
              message: res.data.message,
              alertVariant: "danger",
              errors: ""
            },
            () => {
              this.showAlerts();
            }
          );
        } else {
          console.log("outlet",res.data.data)
          this.setState({ outlet: res.data.data[0].T_name });
        }
      })
      .catch(err => {
        console.log("eror in edit outlet", err);
      });
    this.setState({ loading: false });
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  updateOutlet = async e => {
    e.preventDefault();
    let data = {
      outlet: this.state.outlet
    };
    console.log("update outlet",data)
    const { errors, isValid } = validateOutlet(data);
    if (isValid) {
      await axios
        .put(
          `http://localhost:5000/api/order/outlet/${this.props.match.params.slug}`,
          data
        )
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
              }
            );
          } else if (res.data.errors) {
            this.setState({ errors: res.data.errors });
          } else {
            this.setState({
              message: res.data.message,
              alertVariant: "danger"
            });
          }
        })
        .catch(err => {
          alert("ERRR");

          this.setState({ errors: err.response.data.errors }, () => {
            console.log(this.state.errors);
          });
        });
    } else {
      this.setState({ errors });
    }
  };
  render() {
    let { errors } = this.state;
    let display = <Spinner />;
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
                  <h2>Edit outlet</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Edit outlet</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to update existing outlet
                    </p>
                    <Form onSubmit={this.updateOutlet}>
                      <Form.Group>
                        <Row>
                          <Col sm="12 mb-2" md="2 mb-0">
                            <Form.Label>Outlet</Form.Label>
                          </Col>
                          <Col md="6">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.outlet
                              })}
                              type="text"
                              value={this.state.outlet}
                              name="outlet"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.outlet}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group>
                        <Row>
                          <Col className="offset-md-2">
                            <Button
                              className="col-sm-12 col-md-2"
                              variant="primary"
                              type="submit"
                            >
                              Update
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
    return<>{display}</>;
  }
}
