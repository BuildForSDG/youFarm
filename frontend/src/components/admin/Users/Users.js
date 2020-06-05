import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { UserServices } from "../../../services/userServices";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false,
      showModal: false,
      activeUserId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getBadgeColor = (is_supplier) => {
    return is_supplier === true
      ? "success"
      : "warning"
  };

  toggleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      activeUserId: item._id
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getAllUsers() {
    UserServices.allUsers().then((response) => {
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

  deleteUser(userId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    UserServices.deleteUser(userId).then((response) => {

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
    this.getAllUsers()
  }

  render() {
    const userList = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users {this.state.loading ? <Spinner size="sm" /> : null}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Address</th>
                      <th scope="col">Supplier Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user) => (
                      <tr key={user._id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.gender}</td>
                        <td>{user.state}</td>
                        <td>{user.city}</td>
                        <td>{user.address}</td>
                        <td>
                          <Badge color={this.getBadgeColor(user.is_supplier)}>{user.is_supplier.toString().toUpperCase()}</Badge>
                        </td>
                        <td>
                          <Button color="danger" onClick={() => this.toggleModal(user)}>Delete</Button>
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
              Please confirm you want to delete this user
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteUser(this.state.activeUserId)}>
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

export default Users;
