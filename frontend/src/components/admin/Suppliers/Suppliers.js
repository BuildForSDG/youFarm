import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Badge, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { SupplierServices } from "../../../services/supplierServices";

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false,
      showModal: false,
      activeSupplierId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getBadgeColor = (status) => {
    return status === "approved"
      ? "success"
      : status === "pending"
        ? "warning"
        : status === "disabled"
          ? "secondary"
          : status === "rejected"
            ? "danger"
            : "primary";
  };

  toggleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      activeSupplierId: item._id
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getAllSuppliers() {
    SupplierServices.allSuppliers().then((response) => {
      if (response.status) {
        this.setState({
          data: response.data
        })
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
      }
    })
  }

  deleteSupplier(supplierId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    SupplierServices.deleteSupplier(supplierId).then((response) => {

      if (response.data.status) {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        this.dismissModal()
        toast.success(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.componentDidMount()
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
      } else {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        this.dismissModal()
        toast.error(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
      }
    })
  }

  componentDidMount() {
    this.getAllSuppliers()
  }

  render() {
    const supplierList = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Suppliers {this.state.loading ? <Spinner size="sm" /> : null}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Business Name</th>
                      <th scope="col">Business Category</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Address</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierList.map((supplier) => (
                      <tr key={supplier._id}>
                        <td>{supplier.business_name}</td>
                        <td>{supplier.business_category}</td>
                        <td>{supplier.first_name} {supplier.last_name}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.gender}</td>
                        <td>{supplier.state}</td>
                        <td>{supplier.city}</td>
                        <td>{supplier.address}</td>
                        <td>
                          <Badge color={this.getBadgeColor(supplier.status)}>{supplier.status.toUpperCase()}</Badge>
                        </td>
                        <td>
                          <Button color="danger" onClick={() => this.toggleModal(supplier)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div>
          <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Are you sure?</ModalHeader>
            <ModalBody>
              Please confirm you want to delete this supplier
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteSupplier(this.state.activeSupplierId)}>
                {this.state.btnloading ? <Spinner size="sm" /> : null}
                {this.state.btnloading ? null : 'Delete'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Suppliers;
