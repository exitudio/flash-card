import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode, toggleStar } from "../../redux/appStatus/appStatusActions";
import StarsComponent from "../reuseable/StarsComponent";

function getVariantName(bool) {
  return bool ? "primary" : "success";
}

export default function Header() {
  const { isShowByMeaning, isFlashCard, stars } = useSelector(
    state => state.appStatus
  );
  const dispatch = useDispatch();
  const onClickModeFactory = mode => () => dispatch(toggleMode(mode));
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">EXIT Card</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ButtonGroup aria-label="Basic example" className="mr-2">
          <Button
            variant={getVariantName(isShowByMeaning)}
            onClick={onClickModeFactory("isShowByMeaning")}
          >
            {isShowByMeaning ? "Show by Meaning" : "Show by Word"}
          </Button>
          <Button
            variant={getVariantName(isFlashCard)}
            onClick={onClickModeFactory("isFlashCard")}
          >
            {isFlashCard ? "Show Questions" : "Show All"}
          </Button>
        </ButtonGroup>
        <StarsComponent stars={stars} action={toggleStar} />
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
