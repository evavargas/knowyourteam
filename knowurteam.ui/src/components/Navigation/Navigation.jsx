import React, {Fragment} from 'react';
import{
    Collapse,
    NavbarToggler,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand
} from 'reactstrap';

const Navigation = () => {
    return ( 
        <Fragment>
            <Navbar className='navbar navbar-expand-md navbar-dark bg-primary' light expand='md'>
            <NavbarBrand >Know Yuor Team</NavbarBrand>
            <NavbarToggler></NavbarToggler>
            <Collapse navbar>{'toolbarMenu'}</Collapse>
            {'userInfoArea'}
            </Navbar>
        </Fragment>
     );
}
 
export default Navigation;