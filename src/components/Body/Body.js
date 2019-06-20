import React from "react";
import Question from "./Question";
import TableWords from "./TableWords";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

export default function Body() {
  const isFlashCard = useSelector(state => state.appStatus.isFlashCard);
  return <Container>{isFlashCard ? <Question /> : <TableWords />}</Container>;
}
