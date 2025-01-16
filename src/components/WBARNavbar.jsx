import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './WBARNavbar.css';
import Stream from './Stream';
import { Link } from 'react-router-dom';

const WBARNavbar = () => {
    return (
        <Navbar sticky={"top"} style={{background:"none"}} expand="xs" variant={"dark"}>
            <Container id={'navbar-container'}>
                <Navbar.Brand as={Link} to="/">
                    <img
                        id={"wbar-logo"}
                        src={"wbar-title-v2.png"}
                        alt="WBAR logo"
                        style={{height: '40px' }}
                    />
                </Navbar.Brand>
                <Stream />
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={'ms-auto'}>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/events">Events</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default WBARNavbar;