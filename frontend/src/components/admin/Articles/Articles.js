import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row, Badge, Table, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ArticleServices } from "../../../services/articleServices";
import TextTruncate from 'react-text-truncate';
import Moment from 'react-moment';


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      btnloading: false,
      showModal: false,
      activeArticleId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getBadgeColor = (published) => {
    return published === true
      ? "success"
      : "warning"
  };

  toggleModal(item) {
    this.setState({
      showModal: !this.state.showModal,
      activeArticleId: item._id
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  navigateToEdit(articleId) {
    this.props.history.push(`/admin/edit-article/${articleId}`)
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

  deleteArticle(articleId) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));
    ArticleServices.delete(articleId).then((response) => {

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
    this.getAllArticles()
  }

  render() {
    const articleList = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={12}>
            <Button className="m-1" color="primary" onClick={() => this.props.history.push("/admin/add-article")}>Add Article</Button>
            <Card>
              <CardHeader>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/admin/dashboard')}>Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      <i className="fa fa-align-justify"></i> Articles {this.state.loading ? <Spinner size="sm" /> : null}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </CardHeader>
              <CardBody>
                {articleList != '' ?
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col" width="30%">Descriptions</th>
                        <th scope="col">Category</th>
                        <th scope="col">Published By</th>
                        <th scope="col">Published?</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articleList.map((article) => (
                        <tr key={article._id}>
                          <td><img src={article.image_url} width="40px" alt="article art" /></td>
                          <td>{article.title}</td>
                          <td>
                            <TextTruncate
                              line={2}
                              element="span"
                              truncateText="…"
                              text={article.body.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                            />
                          </td>
                          <td>{article.category}</td>
                          <td>{article.publisher.name}</td>
                          <td>
                            <Badge color={this.getBadgeColor(article.published)}>{article.published.toString().toUpperCase()}</Badge>
                          </td>
                          <td><Moment format="Do MMMM YYYY">{article.created_at * 1000}</Moment></td>
                          <td>
                            <Button className="m-1" color="primary" onClick={() => this.navigateToEdit(article._id)}>
                              <i className="fa fa-pencil"></i>
                            </Button>
                            <Button color="danger" onClick={() => this.toggleModal(article)}>
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
              Please confirm you want to delete this article
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteArticle(this.state.activeArticleId)}>
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

export default Articles;
