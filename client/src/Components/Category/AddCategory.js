import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import classnames from "classnames";
import Spinner from "../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Routes from "../../config/Route";
import validatecategory from "../../Validation/Admin/CategoryValidation";
import Modal from "../../UI/Modal/messageModal";
import Navbar from '../Navbar'
class AddCategory extends Component {
  state = {
    loading: false,
    show: false,
    message: "",
    category: "",
    errors: ""
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
  };

  Addcategory = async e => {
    e.preventDefault();
    let data = {
      category: this.state.category,
    };
    console.log(data)
    const { errors, isValid } = validatecategory(data);
    if (isValid) {
      await axios
        .post("http://localhost:5000/api/category/category/add", data)
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

  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
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
                  <h2>Add category</h2>
                </div>
                <hr />
                <Card>
                  <Card.Body>
                    <h5>Add category</h5>
                    <p style={{ fontSize: ".9rem", color: "#ACACAC" }}>
                      Use this form to add new category
                    </p>
                    <Form onSubmit={this.Addcategory}>
                      <Form.Group>
                        <Row>
                          <Col sm="12 mb-2" md="2 mb-0">
                            <Form.Label>Add category</Form.Label>
                          </Col>
                          <Col md="6">
                            <Form.Control
                              className={classnames({
                                "is-invalid": errors.category
                              })}
                              type="text"
                              placeholder="category"
                              name="category"
                              onChange={this.changeHandler}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.category}
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
                              Submit
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
// const mapActionToProps = dispatch => ({
//   login: () => dispatch(login()),
//   auth: payload => dispatch(auth(payload))
// });
export default withRouter(AddCategory);
// export default connect(
//   null,
//   mapActionToProps
// )(withRouter(Addcategory));
