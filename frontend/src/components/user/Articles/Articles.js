import React, { Component } from "react";
import { CardImg, CardText, CardTitle, CardSubtitle, Card, CardBody, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ArticleServices } from "../../../services/articleServices";
import TextTruncate from 'react-text-truncate';
import { NavLink } from "react-router-dom";
import Moment from 'react-moment';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false
    };
  }

  getAllArticles() {
    ArticleServices.articles().then((response) => {
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
    this.getAllArticles()
  }

  render() {
    const articleList = this.state.data;
    return (
      <div className="animated fadeIn m-3">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem active tag="span">
              All Articles {this.state.loading ? <Spinner size="sm" /> : null}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Row>
          {articleList.map((article) => (
            <Col md={4} key={article._id}>
              <Card>
                <CardImg style={{ height: "200px" }} top width="100%" src={article.image_url} alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h4">{article.title}</CardTitle>
                  <CardSubtitle>
                    <small>By: {article.publisher.name} / {article.category} / <Moment format="Do MMMM YYYY">{article.created_at * 1000}</Moment></small>
                  </CardSubtitle>
                  <CardText>
                    <TextTruncate
                      line={3}
                      element="span"
                      truncateText="…"
                      text={article.body.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                    />
                  </CardText>
                  <NavLink to={"/user/article/" + article._id}>View More</NavLink>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div >
    );
  }
}

export default Articles;
