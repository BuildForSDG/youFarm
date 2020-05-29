import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';

import { AdminServices } from "../../../services/adminServices";

class Administrators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false,
      showModal: false,
      activeAdminId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      activeAdminId: item._id
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getAllAdmins() {
    AdminServices.allAdmins().then((response) => {
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

  deleteAdmin(adminId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    AdminServices.deleteAdmin(adminId).then((response) => {

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
    this.getAllAdmins()
  }

  render() {
    const adminList = this.state.data
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Administrators {this.state.loading ? <Spinner size="sm" /> : null}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList.map((admin) => (
                      <tr key={admin._id}>
                        <td>{admin.first_name}</td>
                        <td>{admin.last_name}</td>
                        <td>{admin.email}</td>
                        <td>
                          <Button color="danger" onClick={() => this.toggleModal(admin)}>
                            Delete
                          </Button>
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
              Please confirm you want to delete this admin
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteAdmin(this.state.activeAdminId)}>
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

export default Administrators;
