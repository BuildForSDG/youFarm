import React, { Component } from "react";
import { toast } from 'react-toastify';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  FormGroup,
  Row,
  Col,
  Input,
  Form
} from "reactstrap";
import PropTypes from "prop-types";
import { UserServices } from '../../../services/userServices'
import { SupplierServices } from '../../../services/supplierServices'
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../../assets/img/brand/youFarm.png";
import icon from "../../../assets/img/brand/icon.png";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_supplier: '',
      supplier_status: '',
      company_name: '',
      btnloading: false,
      showModal: false,
      category: ''
    };
    this.apply = this.apply.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  dismissModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  apply(e) {
    this.setState((prevState) => ({
      btnloading: !prevState.btnloading
    }));

    const applyPayload = {
      business_name: this.state.company_name,
      business_category: this.state.category
    };
    e.preventDefault();
    SupplierServices.apply(applyPayload).then((response) => {
      if (response.status) {
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.componentDidMount()
        this.dismissModal()
      } else {
        this.setState((prevState) => ({
          btnloading: !prevState.btnloading
        }));
        toast.error(response.message, {
          autoClose: 2000,
          hideProgressBar: true
        });
        this.dismissModal()
      }
    });
  }

  getUserDetails() {
    UserServices.userDetails(localStorage.getItem('userId')).then((response) => {
      if (response.status) {
        if (response.data.supplier) {
          this.setState({
            supplier_status: response.data.supplier.status,
            company_name: response.data.supplier.business_name
          })
        }
      }
    })
  }

  componentDidMount() {
    this.getUserDetails()
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "youFarm Logo" }}
          minimized={{ src: icon, width: 30, height: 30, alt: "youFarm Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          {this.state.supplier_status !== "" ? null :
            <NavItem>
              <NavLink to="#" className="nav-link">
                <Button color="primary" onClick={() => this.toggleModal()}>APPLY AS SUPPLIER</Button>
              </NavLink>
            </NavItem>}
          {this.state.supplier_status === "pending" ?
            <NavItem>
              <NavLink to="#" className="nav-link">
                <Button color="warning" disabled >REQUEST PENDING</Button>
              </NavLink>
            </NavItem> : null}
          {this.state.supplier_status === "disabled" ?
            <NavItem>
              <NavLink to="#" className="nav-link">
                <Button color="secondary" disabled >SUPPLIER DISABLED</Button>
              </NavLink>
            </NavItem> : null}
          {this.state.supplier_status === "rejected" ?
            <NavItem>
              <NavLink to="#" className="nav-link">
                <Button color="danger" disabled >SUPPLIER REJECTED</Button>
              </NavLink>
            </NavItem> : null}
          {this.state.supplier_status === "approved" ?
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link">
                <Button color="primary" disabled >{this.state.company_name.toUpperCase()}</Button>
              </NavLink>
            </NavItem> : null}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={"../../assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-user"></i> Profile
              </DropdownItem>
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <div>
          <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Apply as supplier</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.apply}>
                <FormGroup>
                  <Input
                    name="company_name"
                    value={this.state.company_name}
                    onChange={this.changeHandler}
                    type="text"
                    placeholder="Company Name"
                  />
                </FormGroup>
                <FormGroup>
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
                <Row>
                  <Col xs="6">
                    <Button color="success" className="px-4">
                      {this.state.btnloading ? <Spinner size="sm" /> : null}
                      {this.state.btnloading ? null : 'Apply'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
