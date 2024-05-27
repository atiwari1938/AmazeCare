
import React from 'react';
import { Navbar, Nav, NavDropdown,Form ,FormControl,Button } from 'react-bootstrap';
import '../../styles/header.css';
import logo from '../../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="header">
            <div className="container-fluid">
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-between align-items-center'>
                    <Nav className="mx-auto">
                        <NavDropdown title="Doctors" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login">Find Doctor</NavDropdown.Item>
                            <NavDropdown.Item href="/appointment">Book Appointment</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href='/About'>About Us</Nav.Link>
                        <Nav.Link href='/Services'>Services</Nav.Link>
                    </Nav>
                    {/* <Form className="d-flex ms-auto">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;
    