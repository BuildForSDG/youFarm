import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { UserServices } from '../../../services/userServices';

class Dashboard extends Component {

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentWillMount() {
    if (!UserServices.userLoggedIn())
      this.props.history.replace('/login');
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "70px" }}
              ></div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "70px" }}
              ></div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "70px" }}></div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "70px" }}
              ></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
