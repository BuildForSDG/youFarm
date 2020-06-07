import React, { Component } from "react";
import { Form, Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Input, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import { ProductServices } from "../../../services/productServices";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      image_url: "",
      price: "",
      status: "",
      image_alt: "",
      btnloading: false,
    };
    this.update = this.update.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: event.target.valueAsNumbe || value,
    });
  }

  update(e) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading,
    }));

    const updatePayload = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      image_url: this.state.image_url,
      status: this.state.status,
      price: this.state.price
    };
    e.preventDefault();
    ProductServices.update(updatePayload, this.props.match.params.id).then((response) => {
      if (response.data.status === true) {
        this.props.history.push("/user/my-products");
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

  getProduct() {
    ProductServices.product(this.props.match.params.id).then((response) => {
      if (response.status) {
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
        this.setState({
          name: response.data.name,
          description: response.data.description,
          category: response.data.category,
          image_url: response.data.image_url,
          price: response.data.price,
          status: response.data.status
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
        uploadPreset: 'pquixxq4',
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
    this.getProduct()
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
                    <BreadcrumbItem tag="a" onClick={() => this.props.history.push('/user/my-products')}>My Products</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">
                      <i className="fa fa-pencil"></i> Edit Product / {this.state.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.update}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.changeHandler} />
                  </FormGroup>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Input
                          type="select"
                          name="category"
                          value={this.state.category}
                          onChange={this.changeHandler}>
                          <option>Select Category</option>
                          <option>Grains</option>
                          <option>Crops</option>
                          <option>Tools</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Button color="primary" onClick={this.openWidget}>Upload Image</Button>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <img src={this.state.image_url} alt={this.state.image_alt} width="50px" /></FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Input
                          type="number"
                          name="price"
                          value={this.state.price}
                          onChange={this.changeHandler}>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Input
                          type="select"
                          name="status"
                          value={this.state.status}
                          onChange={this.changeHandler}>
                          <option>Select Status</option>
                          <option>Available</option>
                          <option>Not Available</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <CKEditor
                      editor={ClassicEditor}
                      data={this.state.description}
                      config={{ placeholder: "Enter description", extraPlugins: [this.imagePluginFactory] }}
                      onInit={editor => { }}
                      image={{
                        resizeUnit: 'px'
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({
                          description: data,
                        });
                      }}
                      onBlur={(event, editor) => { }}
                      onFocus={(event, editor) => { }}
                    />
                  </FormGroup>
                  <Button color="success">
                    {this.state.btnloading ? <Spinner size="sm" /> : null}
                    {this.state.btnloading ? null : "Edit Product"}
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

export default EditProduct;
