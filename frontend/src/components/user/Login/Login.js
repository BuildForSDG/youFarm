import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserServices } from '../../../services/userServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import logo from '../../../assets/img/brand/youFarm.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };

    this.login = this.login.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  componentWillMount() {
    if (UserServices.userLoggedIn())
      this.props.history.replace('/user/articles');
  }


  login(e) {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }));

    const loginPayload = {
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();
    UserServices.login(loginPayload).then((response) => {
      if (response.status) {
        UserServices.setToken(response.token)
        UserServices.setUserId(response.data.id)
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.props.history.push('/user/articles');
      } else {
        this.setState((prevState) => ({
          loading: !prevState.loading
        }));
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
      }
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                  <CardBody className="text-center">
                    <img src={logo} alt="logo" width="50%" />
                    <Form onSubmit={this.login}>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          value={this.state.email}
                          onChange={this.changeHandler}
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          value={this.state.password}
                          onChange={this.changeHandler}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4">
                            {this.state.loading ? <Spinner size="sm" /> : null}
                            {this.state.loading ? null : 'Login'}
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link color="link" className="px-0">
                            Forgot password?
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-success p-4">
                  <CardBody className="text-center">
                    <div>
                      <h1>Sign up</h1>
                      <p>
                        Want to improve your farming skills and automate your family process. Join us now to experience
                        a life changing farming experience.
                      </p>
                      <Link to="/register">
                        <Button color="danger" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
