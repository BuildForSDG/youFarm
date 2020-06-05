import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Badge, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from "reactstrap";
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
      showDeleteModal: false,
      showApproveModal: false,
      showRejectModal: false,
      showDisableModal: false,
      activeSupplierId: null
    };
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleApproveModal = this.toggleApproveModal.bind(this);
    this.toggleRejectModal = this.toggleRejectModal.bind(this);
    this.toggleDisableModal = this.toggleDisableModal.bind(this);
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

  showApproveButton = (status) => {
    return status === "pending" ||
      status === "rejected" ||
      status === "disabled" ? true : false
  }

  showRejectButton = (status) => {
    return status === "pending" ? true : false
  }

  showDisableButton = (status) => {
    return status === "approved" ? true : false
  }

  toggleApproveModal(item) {
    this.setState({
      showApproveModal: !this.state.showApproveModal,
      activeSupplierId: item._id
    })
  }

  dismissApproveModal() {
    this.setState({
      showApproveModal: !this.state.showApproveModal
    })
  }

  toggleRejectModal(item) {
    this.setState({
      showRejectModal: !this.state.showRejectModal,
      activeSupplierId: item._id
    })
  }

  dismissRejectModal() {
    this.setState({
      showRejectModal: !this.state.showRejectModal
    })
  }

  toggleDisableModal(item) {
    this.setState({
      showDisableModal: !this.state.showDisableModal,
      activeSupplierId: item._id
    })
  }

  dismissDisableModal() {
    this.setState({
      showDisableModal: !this.state.showDisableModal
    })
  }

  toggleDeleteModal(item) {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      activeSupplierId: item._id
    })
  }

  dismissDeleteModal() {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
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
        this.dismissDeleteModal()
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
        this.dismissDeleteModal()
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

  approveSupplier(supplierId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    SupplierServices.approve(supplierId).then((response) => {

      if (response.status) {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        this.dismissApproveModal()
        toast.success(response.message, {
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
        this.dismissApproveModal()
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

  rejectSupplier(supplierId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    SupplierServices.reject(supplierId).then((response) => {

      if (response.status) {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        this.dismissRejectModal()
        toast.success(response.message, {
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
        this.dismissRejectModal()
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

  disableSupplier(supplierId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    SupplierServices.disable(supplierId).then((response) => {

      if (response.status) {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        this.dismissDisableModal()
        toast.success(response.message, {
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
        this.dismissDisableModal()
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
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/admin/dashboard')}>Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      <i className="fa fa-align-justify"></i> Suppliers {this.state.loading ? <Spinner size="sm" /> : null}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col">Business Name</th>
                      <th scope="col">Category</th>
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
                          <div className="right">
                            {this.showApproveButton(supplier.status) ?
                              <Button className="m-1" title="Approve" color="success" onClick={() => this.toggleApproveModal(supplier)}>
                                <i className="fas fa-check"></i>
                              </Button> : null
                            }
                            {this.showRejectButton(supplier.status) ?
                              <Button className="m-1" title="Reject" color="warning" onClick={() => this.toggleRejectModal(supplier)}>
                                <i className="fas fa-times"></i>
                              </Button> : null
                            }
                            {this.showDisableButton(supplier.status) ?
                              <Button className="m-1" title="Disable" color="secondary" onClick={() => this.toggleDisableModal(supplier)}>
                                <i className="fas fa-plane-slash"></i>
                              </Button> : null
                            }
                            <Button color="danger" onClick={() => this.toggleDeleteModal(supplier)}>
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
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
          <Modal isOpen={this.state.showApproveModal} toggle={this.toggleApproveModal}>
            <ModalHeader toggle={this.toggleApproveModal}>Are you sure?</ModalHeader>
            <ModalBody>
              Please confirm you want to approve this supplier
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => this.approveSupplier(this.state.activeSupplierId)}>
                {this.state.btnloading ? <Spinner size="sm" /> : null}
                {this.state.btnloading ? null : 'Approve'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.showRejectModal} toggle={this.toggleRejectModal}>
            <ModalHeader toggle={this.toggleRejectModal}>Are you sure?</ModalHeader>
            <ModalBody>
              Please confirm you want to reject this supplier
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={() => this.rejectSupplier(this.state.activeSupplierId)}>
                {this.state.btnloading ? <Spinner size="sm" /> : null}
                {this.state.btnloading ? null : 'Reject'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.showDisableModal} toggle={this.toggleDisableModal}>
            <ModalHeader toggle={this.toggleDisableModal}>Are you sure?</ModalHeader>
            <ModalBody>
              Please confirm you want to disable this supplier
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.disableSupplier(this.state.activeSupplierId)}>
                {this.state.btnloading ? <Spinner size="sm" /> : null}
                {this.state.btnloading ? null : 'Disable'}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.showDeleteModal} toggle={this.toggleDeleteModal}>
            <ModalHeader toggle={this.toggleDeleteModal}>Are you sure?</ModalHeader>
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
