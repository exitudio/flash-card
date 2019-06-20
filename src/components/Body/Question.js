import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { selectQuestions } from "../../selectors/questionSelectors";
import "./Question.scss";
import { setAnswer } from "../../redux/word/wordActions";
import { gotoQuestion } from "../../redux/word/wordActions";
import { ReactComponent as True } from "./check.svg";
import { ReactComponent as False } from "./x.svg";
import { ReactComponent as Next } from "./media-step-forward.svg";
import StarsComponent from "../reuseable/StarsComponent";
import { postStar } from "../../redux/word/wordActions";

const Check = props => {
  if (props.answerIndex === props.currentAnswer) {
    if (props.correctAnswer === props.currentAnswer) {
      return <True className="check" />;
    }
    return <False className="check" />;
  }
  return null;
};

const getAnswerCss = (answerIndex, correctAnswer, currentAnswer) => {
  if (answerIndex === currentAnswer) {
    if (correctAnswer === currentAnswer) {
      return "correct";
    }
    return "incorrect";
  }
  return "";
};
export default function Question() {
  const question = useSelector(selectQuestions);
  const currentQuestion = useSelector(state => state.word.currentQuestion);
  const dispatch = useDispatch();
  return question ? (
    <Card>
      <Card.Header className="head-question">
        {question.question}
        <br/>
        <StarsComponent stars={question.star} word={question.key} action={postStar} />
        {question.correctAnswer === question.answer ? (
          <Next
            className="next"
            onClick={() => dispatch(gotoQuestion(currentQuestion + 1))}
          />
        ) : null}
      </Card.Header>
      <Card.Body>
        <Card.Title />
        <Card.Text />
        <ListGroup>
          {question.choices.map((choice, answer) => {
            return (
              <ListGroup.Item
                key={answer}
                className={`focus-item ${getAnswerCss(
                  answer,
                  question.correctAnswer,
                  question.answer
                )}`}
                action
                onClick={e => {
                  if (
                    answer === question.correctAnswer &&
                    question.answer === question.correctAnswer
                  ) {
                    dispatch(gotoQuestion(currentQuestion + 1));
                  } else {
                    dispatch(setAnswer(currentQuestion, answer));
                  }
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {choice}
                <Check
                  answerIndex={answer}
                  correctAnswer={question.correctAnswer}
                  currentAnswer={question.answer}
                />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  ) : null;
}
