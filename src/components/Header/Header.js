import React from "react";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMode,
  toggleStar,
  changeVocabType
} from "../../redux/appStatus/appStatusActions";
import StarsComponent from "../reuseable/StarsComponent";
import Axios from "axios";

function getVariantName(bool) {
  return bool ? "primary" : "success";
}

export default function Header() {
  const { isShowByMeaning, isFlashCard, stars, vocabType } = useSelector(
    state => state.appStatus
  );
  const dispatch = useDispatch();
  const onClickModeFactory = mode => () => dispatch(toggleMode(mode));
  const onClickChangeVocabType = type => () => dispatch(changeVocabType(type));
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
        <DropdownButton
          id="dropdown-basic-button"
          title={vocabType}
          onClick={onClickChangeVocabType}
        >
          {["gre1", "gre2", "gre3", "gre50", "greTest1"].map((type, i) => (
            <Dropdown.Item key={i} onClick={onClickChangeVocabType(type)}>
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Navbar.Collapse>
      <Button onClick={() => Axios.get(`/api/commit`)}>Save</Button>
    </Navbar>
  );
}
