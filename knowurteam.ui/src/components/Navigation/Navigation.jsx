import React, { Fragment, Component } from "react";
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink as NavLinkRouter } from "react-router-dom";
import Login from "./Login";
import { withRouter } from "react-router-dom";
class Navigation extends Component {
  state = {
    dropdownOpen: false
  };

  toogleHandler = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { isAuthenticated, decodedToken, logout } = this.props;
    const { dropdownOpen } = this.state;
    let toolbarMenu = null;
    if (isAuthenticated) {
      toolbarMenu = (
        <Nav navbar>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to="/members">
              Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to="/lists">
              Clubmates
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    let userInfoArea = isAuthenticated ? (
      <div className="dropdown">
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.toogleHandler}>
          <DropdownToggle caret color="primary">
            Welcome {decodedToken.unique_name}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <i className="fa fa-user"></i>Edit Profile
            </DropdownItem>
            <DropdownItem onClick={logout}>
              <i className="fa fa-sign-out"></i>Logout
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    ) : (
      <Login />
    );
    return (
      <Fragment>
        <Navbar
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          light
          expand="md"
        >
          <NavbarBrand tag={NavLinkRouter} exact to="/">
            Know your club
          </NavbarBrand>
          <NavbarToggler></NavbarToggler>
          <Collapse navbar>{toolbarMenu}</Collapse>
          {userInfoArea}
        </Navbar>
      </Fragment>
    );
  }
}

export default withRouter(Navigation);
