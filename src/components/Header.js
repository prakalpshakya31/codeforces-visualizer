import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              Codeforces Visualizer
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
          <Nav className='ml-auto'>
            <LinkContainer to='/'>
              <Nav.Link>
                <i className='fas fa-home'></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/compare'>
              <Nav.Link>
                <i className='fas fa-compress'></i> Compare
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
