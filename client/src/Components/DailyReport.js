import React, { Component } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { Col, Card, Container, Row } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Axios from "axios";
import Modal from "../UI/Modal/messageModal";

const dataTableData = {
  columns: [
    {
      label: "M_id",
      field: "mid",
      sort: "asc"
    },
    {
      label: "Menu Name",
      field: "mname",
      sort: "asc"
    },
    {
      label: "Menu Status",
      field: "mstatus",
      sort: "asc"
    },
    {
      label: "Menu Category",
      field: "mcategory",
      sort: "asc"
    },
    {
      label: "Price",
      field: "price",
      sort: "asc"
    },
    {
      label: "Action",
      field: "action",
      sort: "asc"
    }
  ],
  rows: []
};

export default class DailyReport extends Component {
  state = {
    data: "",
    loading: true,
    show: false,
    message: ""
  };
  componentDidMount = async () => {
    await this.loadData();
    this.loadTable();
    this.setState({ loading: false });
  };
  stockoutHandler = async e => {
    console.log("id", e.target.id);
    await Axios.put(
      `http://localhost:5000/api/Menu/menu/stockout/${e.target.id}`
    )
      .then(async res => {
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
          this.setState({ loading: true });
          await this.loadData();
          await this.loadTable();
          this.setState({ loading: false });
        } else if (res.data.type === "error") {
          console.log("error", res.data.message);
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
        }
      })
      .catch(err => console.log("err", err));
  };
  availableHandler = async e => {
    await Axios.put(
      `http://localhost:5000/api/Menu/menu/available/${e.target.id}`
    )
      .then(async res => {
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
          this.setState({ loading: true });
          await this.loadData();
          await this.loadTable();
          this.setState({ loading: false });
        } else if (res.data.type === "error") {
          console.log("error", res.data.message);
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
        }
      })
      .catch(err => console.log("err", err));
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  loadData = async () => {
    await Axios.get("http://localhost:5000/api/Menu/menu")
      .then(res => {
        console.log("loadData", res);
        if (res.data.type === "success") {
          this.setState({
            data: res.data.data
          });
        } else if (res.data.type === "error") {
          console.log("error", res.data.message);
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
        }
      })
      .catch(err => console.log("err", err));
  };

  loadTable = () => {
    let i = 0;
    dataTableData.rows = [];
    for (let record of this.state.data) {
      i++;
      dataTableData.rows.push({
        mid: i,
        mname: record.MName,
        mcategory: record.MCategory,
        mstatus:
          record.MStatus === "available" ? (
            <h6 style={{ color: "green" }}>{record.MStatus.toUpperCase()}</h6>
          ) : (
            <h6 style={{ color: "red" }}>{record.MStatus.toUpperCase()}</h6>
          ),
        price: record.Price,
        action: (
          <div>
            {record.MStatus === "available" ? (
              <button
                className="btn btn-outline-danger"
                id={record.M_id}
                onClick={this.stockoutHandler}
              >
                Stock Out
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                id={record.M_id}
                onClick={this.availableHandler}
              >
                Available
              </button>
            )}
          </div>
        )
      });
    }
  };

  render() {
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <section
            className="d-flex"
            style={{ position: "relative", width: "100vw" }}
          >
            <Container
              fluid
              style={{ margin: "0", padding: "0", background: "#eeeeee" }}
            >
              <Row noGutters>
                <Col className="p-3 m-2">
                  <h2>Todays Menu</h2>
                  <hr />
                  <Card>
                    <Card.Body>
                      <MDBDataTable
                        responsive
                        striped
                        hover
                        data={dataTableData}
                        searching={true}
                      />
                    </Card.Body>
                  </Card>{" "}
                </Col>
              </Row>
            </Container>
            <Modal
              show={this.state.show}
              close={this.modalClose}
              variant={this.state.alertVariant}
              message={this.state.message}
            />
          </section>
        </>
      );
    }
    return <>{display}</>;
  }
}
