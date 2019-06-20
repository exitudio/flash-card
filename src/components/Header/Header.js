import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../redux/appStatus/appStatusActions";

function getVariantName(bool) {
  return bool ? "primary" : "success";
}

export default function Header() {
  const { isShowByMeaning, isFlashCard, star } = useSelector(
    state => state.appStatus
  );

  const dispatch = useDispatch();
  const onClickFactory = mode => {
    return () => {
      dispatch(toggleMode(mode));
    };
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">EXIT Card</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ButtonGroup aria-label="Basic example" className="mr-2">
          <Button
            variant={getVariantName(isShowByMeaning)}
            onClick={onClickFactory("isShowByMeaning")}
          >
            {isShowByMeaning ? "Show by Meaning" : "Show by Word"}
          </Button>
          <Button
            variant={getVariantName(isFlashCard)}
            onClick={onClickFactory("isFlashCard")}
          >
            {isFlashCard ? "Show Questions" : "Show All"}
          </Button>
        </ButtonGroup>
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
