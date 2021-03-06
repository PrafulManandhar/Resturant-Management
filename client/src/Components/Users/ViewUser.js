import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Axios from "axios";
import Navbar from "../Navbar";
import Spinner from "../../UI/Spinner/Spinner";
import { Col, Card, Container, Row } from "react-bootstrap";
import { Router } from "react-router-dom";
import Routes from "../../config/Route";
import ConfirmationModal from "../../UI/Modal/confirmationModal";
import Modal from "../../UI/Modal/messageModal";

const dataTableData = {
  columns: [
    {
      label: "C-id",
      field: "cid",
      sort: "asc"
    },
    {
      label: "Category Name",
      field: "cname",
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

export default class ViewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
      confirmShow: false,
      deletingId: "",
      show: false
    };
  }
  deleteCategory = async () => {
    await Axios.delete(
      `http://localhost:5000/api/category/category/${this.state.deletingId}`
    )
      .then(async res => {
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
          this.setState(
            {
              message: res.data.message,
              alertVariant: "success",
              errors: ""
            },
           async () => {
              this.showAlerts();
             
            }
          );
          this.setState({ loading: true });
          await this.loadData();
          await this.loadTable();
          this.setState({ loading: false });

        }
      })
      .catch(err => {
        console.log("eror in delete Category", err);
      });

    this.setState({ confirmShow: false });
  };

  loadData =async()=>{
    await Axios.get("http://localhost:5000/api/category/categories")
      .then(res => {
        console.log(res);
        this.setState({ data: res.data.data });
      })
      .catch(err => console.log("err", err));
  }

  editHandler = e => {
    let slug = e.target.id;
    this.props.history.push(`${Routes.EDIT_CATEGORY}/${slug}`);
  };
  deleteHandler = e => {
    let slug = e.target.id;
    console.log("deleteHandler",slug);

    this.setState({ confirmShow: true, deletingId: slug });
  };

  confirmModalClose = () => {
    this.setState({ confirmShow: false });
  };
  showAlerts = () => {
    this.setState({ show: true });
  };
  modalClose = () => {
    this.setState({ show: false });
  };
  componentDidMount = async () => {
    await Axios.get("http://localhost:5000/api/category/categories")
      .then(res => {
        console.log(res);
        this.setState({ data: res.data.data });
      })
      .catch(err => console.log("err", err));

      this.loadTable();
   
    this.setState({ loading: false });
  };

  loadTable = () =>{
    let i = 0;
    dataTableData.rows = [];
    for (let record of this.state.data) {
      i++;
      dataTableData.rows.push({
        cid: record.id,
        cname: record.cnames,
        action: (
          <div>
            <button
              className="btn btn-outline-primary"
              id={record.id}
              onClick={this.editHandler}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-success"
              id={record.id}
              onClick={this.viewHandler}
            >
              View
            </button>
            <button
              className="btn btn-outline-danger"
              id={record.id}
              onClick={this.deleteHandler}
            >
              Delete
            </button>
          </div>
        )
      });
    }
  }

  render() {
    let display = <Spinner />;
    if (!this.state.loading) {
      display = (
        <>
          <Navbar />
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
                  <h2>View Category</h2>
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
            <ConfirmationModal
              show={this.state.confirmShow}
              close={this.confirmModalClose}
              type="Category"
              Confirmdelete={this.deleteCategory}
            />
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
