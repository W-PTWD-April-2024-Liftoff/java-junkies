import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
import LogOut from './LogOut';

function CustomNavbar() {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  const passwordLogin = localStorage.getItem('passwordLogin') === 'true';
  const { id } = useParams();


  const renderNavbar = (isAuthenticated || passwordLogin) &&
    !['/user/login', '/user/register'].includes(location.pathname);

  if (!renderNavbar) return null;


  const userId = localStorage.getItem('userId');

  return (
    <Navbar bg='light' variant='light' fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to="/posts">
          <img
            src={logo}
            alt='In the Loop logo'
            height='30'
            width='30'
            className='d-inline-block align-top'
          />{' '}
          In The Loop
        </Navbar.Brand>

        <Nav className='me-auto'>
          <Nav.Link as={Link} to="/posts">Discussion</Nav.Link>
        </Nav>

        <Nav className='ms-auto'>
          <Nav.Link as={Link} to={`/profile/${userId}`}>Profile</Nav.Link>
          <Nav.Item>
            <LogOut />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;