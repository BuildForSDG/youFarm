import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ProductServices } from "../../../services/productServices";
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';


class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false,
      showModal: false,
      activeProductId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getBadgeColor = (status) => {
    return status === "Available"
      ? "success"
      : "warning"
  };

  toggleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      activeProductId: item._id
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  navigateToEdit(productId) {
    this.props.history.push(`/user/edit-product/${productId}`)
  }

  getMyProducts() {
    ProductServices.myProducts().then((response) => {
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

  deleteProduct(productId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    ProductServices.delete(productId).then((response) => {

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
    this.getMyProducts()
  }

  render() {
    const productList = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={12}>
            <Button className="m-1" color="primary" onClick={() => this.props.history.push("/user/add-product")}>Add Product</Button>
            <Card>
              <CardHeader>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem active tag="span">
                      <i className="fa fa-align-justify"></i> My Products {this.state.loading ? <Spinner size="sm" /> : null}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </CardHeader>
              <CardBody>
                {productList != '' ?
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col" width="30%">Descriptions</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr key={product._id}>
                          <td><img src={product.image_url} width="40px" alt="product art" /></td>
                          <td>{product.name}</td>
                          <td>
                            <TextTruncate
                              line={2}
                              element="span"
                              truncateText="…"
                              text={product.description.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                            />
                          </td>
                          <td>{product.category}</td>
                          <td><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></td>
                          <td>
                            <Badge color={this.getBadgeColor(product.status)}>{product.status.toString().toUpperCase()}</Badge>
                          </td>
                          <td><Moment format="Do MMMM YYYY">{product.created_at * 1000}</Moment></td>
                          <td>
                            <Button className="m-1" color="primary" onClick={() => this.navigateToEdit(product._id)}>
                              <i className="fa fa-pencil"></i>
                            </Button>
                            <Button color="danger" onClick={() => this.toggleModal(product)}>
                              <i className="fa fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table> : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div>
          <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Are you sure?</ModalHeader>
            <ModalBody>
              Please confirm you want to delete this product
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteProduct(this.state.activeProductId)}>
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

export default MyProducts;
