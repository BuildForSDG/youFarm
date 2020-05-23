import React, { Component } from "react";
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
    };
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
                  <Form>
                    <p className="text-muted">Edit your profile</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
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
                        type="text"
                        placeholder="Last Name"
                        autoComplete="lastname"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Phone"
                        autoComplete="phone"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-shield"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="gender">
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
                      <Input type="select" name="state">
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
                        type="text"
                        placeholder="City"
                        autoComplete="city"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="cui-map"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Address"
                        autoComplete="address"
                      />
                    </InputGroup>
                    <Button color="success" block>
                      Edit Profile
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
