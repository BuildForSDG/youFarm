import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
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
  Row
} from 'reactstrap';
import NaijaStates from 'naija-state-local-government';
import { UserServices } from '../../../services/userServices';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone: '',
      gender: '',
      state: '',
      city: '',
      address: '',
      states: [],
      loading: false
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.getUserDetails()
    const allStates = NaijaStates.states().map((state) => {
      return { value: state, display: state };
    });
    this.setState({
      states: [{ value: '', display: 'State' }].concat(allStates)
    });
  }

  getUserDetails() {
    UserServices.userDetails(UserServices.getUserId()).then((response) => {
      if (response.status) {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          phone: response.data.phone,
          gender: response.data.gender,
          state: response.data.state,
          city: response.data.city,
          address: response.data.address
        })
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
      }
    })
  }

  setLoadingState() {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }));
  }

  updateProfile(e) {
    this.setLoadingState()
    const userPayload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      gender: this.state.gender,
      state: this.state.state,
      city: this.state.city,
      address: this.state.address
    };
    e.preventDefault();
    UserServices.update(userPayload).then((response) => {
      if (response.data.status) {
        this.props.history.push('/user/profile');
        toast.success(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.setLoadingState()
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.setLoadingState()
      }
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
                  <Form onSubmit={this.updateProfile}>
                    <p className="text-muted">Edit your profile</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        autoComplete="firstname"
                        value={this.state.first_name}
                        onChange={this.changeHandler} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="lastname"
                        value={this.state.last_name}
                        onChange={this.changeHandler} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        autoComplete="phone"
                        value={this.state.phone}
                        onChange={this.changeHandler} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-shield"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="gender"
                        type="select"
                        value={this.state.gender}
                        onChange={this.changeHandler} >
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-tags"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="state"
                        value={this.state.state}
                        onChange={this.changeHandler} >
                        {this.state.states.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.display}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-star"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="city"
                        type="text"
                        placeholder="City"
                        autoComplete="city"
                        value={this.state.city}
                        onChange={this.changeHandler} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-map"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="address"
                        type="text"
                        placeholder="Address"
                        autoComplete="address"
                        value={this.state.address}
                        onChange={this.changeHandler} />
                    </InputGroup>
                    <Button color="success" className="px-4">
                      {this.state.loading ? <Spinner size="sm" /> : null}
                      {this.state.loading ? null : 'Update Profile'}
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

export default Profile;
