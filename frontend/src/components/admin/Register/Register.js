import React, { Component } from "react";
import { UserServices } from "../../../services/userServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "reactstrap";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import NaijaStates from "naija-state-local-government";
import logo from "../../../assets/img/brand/youFarm.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      state: "",
      city: "",
      address: "",
      password: "",
      password_confirmation: "",
      loading: false,
    };

    this.register = this.register.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  register(e) {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));

    const registerPayload = {
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    e.preventDefault();
    UserServices.register(registerPayload).then((response) => {
      if (response.status === true) {
        this.props.history.push("/login");
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        this.setState((prevState) => ({
          loading: !prevState.loading,
        }));
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    });
  }

  componentDidMount() {
    const allStates = NaijaStates.states().map((state) => {
      return { value: state, display: state };
    });
    this.setState({
      states: [{ value: "", display: "State" }].concat(allStates),
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4 text-center">
                  <img src={logo} alt="logo" width="50%" />
                  <Form onSubmit={this.register}>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onChange={this.changeHandler}
                        placeholder="First Name"
                        autoComplete="firstname"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onChange={this.changeHandler}
                        placeholder="Last Name"
                        autoComplete="lastname"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password_confirmation"
                        type="password"
                        value={this.state.password_confirmation}
                        onChange={this.changeHandler}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <Button color="success" block>
                      {this.state.loading ? <Spinner size="sm" /> : null}
                      {this.state.loading ? null : "Create Account"}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;

