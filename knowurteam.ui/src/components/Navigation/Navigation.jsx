import React, { Fragment } from 'react';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';

const Navigation = () => {
  let toolbarMenu = null;
  toolbarMenu = (
    <Nav navbar>
      <NavItem>
        <NavLink tag={NavLinkRouter} exact to='/members'>
          Matches
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={NavLinkRouter} exact to='/lists'>
          Lists
        </NavLink>
      </NavItem>
    </Nav>
  );


    return ( 
        <Fragment>
            <Navbar className='navbar navbar-expand-lg navbar-dark bg-dark' light expand='md'>
            <NavbarBrand tag={NavLinkRouter} exact to='/'>Know Yuor Team</NavbarBrand>
            <NavbarToggler></NavbarToggler>
            <Collapse navbar>{toolbarMenu}</Collapse>
            {'userInfoArea'}
            </Navbar>
        </Fragment>
  );
};

export default Navigation;
