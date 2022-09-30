import React from 'react'
import { Container, Navbar } from "react-bootstrap";
const Nav = () => {
  return (
    <div>
        <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand href="#">
            <img
              src="/img/genyenlogo.png"
              className="logo img-fluid"
              alt="genyen logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Nav