import React from "react";
import Header from "./Header";
import Body from "./Body";
import { useDidMount } from "../hooks/lifeCycleHoocks";
import { useDispatch } from "react-redux";
import { initializeApp } from "../redux/appStatus/appStatusActions";

function App() {
  const dispatch = useDispatch();
  useDidMount(() => {
    dispatch(initializeApp());
  });
  return (
    <>
      <Header />
      <br />
      <Body />
    </>
  );
}

export default App;
