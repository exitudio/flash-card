import React from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function getCss(stars, buttonStar) {
  if ( typeof stars === "number") {
    return stars === buttonStar ? "primary" : "secondary";
  }
  return !!stars[buttonStar] ? "primary" : "secondary";
}

const StarsComponent = props => {
  const dispatch = useDispatch();
  const onClickFactory = buttonStar => () => {
    console.log('buttonStar:', buttonStar, 'props.word:', props.word)
    dispatch(props.action(buttonStar, props.word));
  };
  return (
    <ButtonGroup className="mr-2" aria-label="First group">
      {[-1, 1, 2, 3, 4, 5].map(buttonStar => (
        <Button
          key={buttonStar}
          variant={getCss(props.stars, buttonStar)}
          onClick={onClickFactory(buttonStar)}
        >
          {buttonStar}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default StarsComponent;
