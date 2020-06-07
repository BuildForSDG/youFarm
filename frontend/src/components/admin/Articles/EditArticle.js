import React, { Component } from "react";
import { Form, Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Input, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ArticleServices } from "../../../services/articleServices";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      category: "",
      image_url: "",
      image_alt: "",
      loading: true,
      btnloading: false,
    };
    this.update = this.update.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  update(e) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading,
    }));

    const updatePayload = {
      title: this.state.title,
      body: this.state.body,
      category: this.state.category,
      image_url: this.state.image_url,
      published: true
    };
    e.preventDefault();
    ArticleServices.update(updatePayload, this.props.match.params.id).then((response) => {
      if (response.data.status === true) {
        this.props.history.push("/admin/articles");
        toast.success(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading,
        }));
        toast.error(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    });
  }

  getArticle() {
    ArticleServices.article(this.props.match.params.id).then((response) => {
      if (response.status) {
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
        this.setState({
          title: response.data.title,
          body: response.data.body,
          category: response.data.category,
          image_url: response.data.image_url
        })
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
      }
    })
  }

  imagePluginFactory(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CloudinaryImageUploadAdapter(
        loader,
        'ilasisi90',
        'hjjhxmi2',
        [160, 500, 1000, 1052]);
    };
  }

  openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'ilasisi90',
        uploadPreset: 'jfarlpkc',
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.setState({
            image_url: result.info.secure_url,
            image_alt: `An image of ${result.info.original_filename}`
          })
        }
      },
    ).open();
  };

  componentDidMount() {
    this.getArticle()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="m-3">
          <Col xl={12}>
            <Card>
              <CardHeader>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/admin/dashboard')}>Home</BreadcrumbItem>
                    <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/admin/articles')}>Articles</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      <i className="fa fa-pencil"></i> Edit Article / {this.state.title}{this.state.loading ? <Spinner size="sm" /> : null}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.update}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.changeHandler} />
                  </FormGroup>
                  <Row>
                    <Col md={4}><FormGroup>
                      <Input
                        type="select"
                        name="category"
                        value={this.state.category}
                        onChange={this.changeHandler}>
                        <option>Select Category</option>
                        <option>General Farming</option>
                        <option>Crops</option>
                        <option>Tools</option>
                      </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Button color="primary" onClick={this.openWidget}>Upload Image</Button>
                    </Col>
                    <Col>
                      <FormGroup>
                        <img src={this.state.image_url} alt={this.state.image_alt} width="50px" /></FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <CKEditor
                      editor={ClassicEditor}
                      data={this.state.body}
                      config={{ placeholder: "Enter description", extraPlugins: [this.imagePluginFactory] }}
                      onInit={editor => { }}
                      image={{
                        resizeUnit: 'px'
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({
                          body: data,
                        });
                      }}
                      onBlur={(event, editor) => { }}
                      onFocus={(event, editor) => { }}
                    />
                  </FormGroup>
                  <Button color="success">
                    {this.state.btnloading ? <Spinner size="sm" /> : null}
                    {this.state.btnloading ? null : "Edit Article"}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditArticle;
