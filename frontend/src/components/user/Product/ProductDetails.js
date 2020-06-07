import React, { Component } from "react";
import { Card, CardImg, Badge, CardTitle, CardText, CardSubtitle, CardBody, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ProductServices } from "../../../services/productServices";
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      image_url: "",
      created_at: "",
      category: "",
      price: "",
      status: "",
      publisher: {},
      loading: true
    };
  }

  getBadgeColor = (status) => {
    return status === "Available"
      ? "success"
      : "warning"
  };

  getProduct() {
    ProductServices.product(this.props.match.params.id).then((response) => {
      if (response.status) {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          image_url: response.data.image_url,
          created_at: response.data.created_at,
          category: response.data.category,
          price: response.data.price,
          status: response.data.status,
          publisher: response.data.publisher
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

  componentDidMount() {
    this.getProduct()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="m-3">
          <Col xl={12}>
            <div>
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/user/marketplace')}>MarketPlace</BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  {this.state.name} {this.state.loading ? <Spinner size="sm" /> : null}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            {this.state.name ?
              <Card className="p-5">
                <Row className="m-2">
                  <Col md={6}>
                    <CardImg style={{ height: "300px" }} top width="100%" src={this.state.image_url} alt="Card image cap" /></Col>
                  <Col md={6}>
                    <CardBody>
                      <CardTitle tag="h2">{this.state.name}</CardTitle>
                      <CardSubtitle><small>Category: {this.state.category}</small></CardSubtitle>
                      <CardTitle tag="h2">₦{this.state.price}</CardTitle>
                      <CardSubtitle className="m-1">
                        <Badge color={this.getBadgeColor(this.state.status)}>{this.state.status.toString().toUpperCase()}</Badge>
                      </CardSubtitle>
                      <CardSubtitle tag="h4" className="m-1">Posted By:</CardSubtitle>
                      <CardSubtitle className="m-1">Name: {this.state.publisher.name}</CardSubtitle>
                      <CardSubtitle className="m-1">Email: {this.state.publisher.email}</CardSubtitle>
                      <CardSubtitle className="m-1">Phone Number: {this.state.publisher.phone}</CardSubtitle>
                      <CardSubtitle className="m-1">Gender: {this.state.publisher.gender}</CardSubtitle>
                      <CardSubtitle className="m-1">City: {this.state.publisher.city}</CardSubtitle>
                      <CardSubtitle className="m-1">State: {this.state.publisher.state}</CardSubtitle>
                      <CardSubtitle className="m-1">Address: {this.state.publisher.address}</CardSubtitle>
                      <CardTitle tag="h6" className="m-1">Posted On: <Moment format="Do MMMM YYYY">{this.state.created_at * 1000}</Moment></CardTitle>
                    </CardBody>
                  </Col>
                </Row>
                <CardTitle tag="h4">Descriptions</CardTitle>
                <CardText>{renderHTML(this.state.description)}</CardText>
              </Card> : null}
          </Col>
        </Row>
      </div >
    );
  }
}

export default ArticleDetails;
