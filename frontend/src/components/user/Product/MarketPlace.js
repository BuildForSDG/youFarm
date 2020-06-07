import React, { Component } from "react";
import { CardImg, Badge, CardTitle, CardSubtitle, Card, CardBody, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ProductServices } from "../../../services/productServices";
import TextTruncate from 'react-text-truncate';
import { NavLink } from "react-router-dom";
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';

class MarketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false
    };
  }

  getBadgeColor = (status) => {
    return status === "Available"
      ? "success"
      : "warning"
  };

  getAllProducts() {
    ProductServices.products().then((response) => {
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

  componentDidMount() {
    this.getAllProducts()
  }

  render() {
    const productList = this.state.data;
    return (
      <div className="animated fadeIn m-3">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem active tag="span">
              MarketPlace {this.state.loading ? <Spinner size="sm" /> : null}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Row>
          {productList.map((product) => (
            <Col md={4} key={product._id}>
              <Card>
                <Row>
                  <Col md={5}>
                    <CardImg className="p-3" src={product.image_url} alt="Card image cap" />
                  </Col>
                  <Col md={7}>
                    <CardBody>
                      <CardTitle tag="h5">
                        <TextTruncate
                          line={2}
                          element="span"
                          truncateText="…"
                          text={product.name}
                        />
                      </CardTitle>
                      <CardTitle tag="h3" style={{ fontWeight: "bolder" }}>
                        <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} /></CardTitle>
                      <Badge color={this.getBadgeColor(product.status)}>{product.status.toString().toUpperCase()}</Badge>
                      <CardSubtitle>
                        <small>{product.category} / <Moment format="Do MMMM YYYY">{product.created_at * 1000}</Moment></small>
                      </CardSubtitle>
                      <NavLink to={"/user/product/" + product._id}>View Details</NavLink>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div >
    );
  }
}

export default MarketPlace;
