import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ArticleServices } from "../../../services/articleServices";
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      image_url: "",
      created_at: "",
      category: "",
      publisher: "",
      loading: true
    };
  }

  getArticle() {
    ArticleServices.article(this.props.match.params.id).then((response) => {
      if (response.status) {
        this.setState({
          title: response.data.title,
          body: response.data.body,
          image_url: response.data.image_url,
          created_at: response.data.created_at,
          category: response.data.category,
          publisher: response.data.publisher.name
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
    this.getArticle()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="m-3">
          <Col xl={12}>
            <div>
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/user/articles')}>Articles</BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  {this.state.title} {this.state.loading ? <Spinner size="sm" /> : null}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            {this.state.title ?
              <Card>
                <CardImg style={{ height: "500px" }} top width="100%" src={this.state.image_url} alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h1">{this.state.title}</CardTitle>
                  <CardSubtitle>
                    <small>By: {this.state.publisher} / {this.state.category} / <Moment format="Do MMMM YYYY">{this.state.created_at * 1000}</Moment></small>
                  </CardSubtitle>
                  <CardText>{renderHTML(this.state.body)}</CardText>
                </CardBody>
              </Card> : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ArticleDetails;
