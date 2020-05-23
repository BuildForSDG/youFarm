import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import adminData from "./AdministratorData";

function AdminRow(props) {
  const admin = props.admin;

  const getBadge = (status) => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={admin.id.toString()}>
      <th scope="row">{admin.id}</th>
      <td>{admin.name}</td>
      <td>{admin.registered}</td>
      <td>{admin.role}</td>
      <td>
        <Badge color={getBadge(admin.status)}>{admin.status}</Badge>
      </td>
    </tr>
  );
}

class Administrators extends Component {
  render() {
    const adminList = adminData.filter((admin) => admin.id < 10);

    return (
      <div className="animated fadeIn">
        <Row className="m-5">
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Administrators{" "}
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList.map((admin, index) => (
                      <AdminRow key={index} admin={admin} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Administrators;
