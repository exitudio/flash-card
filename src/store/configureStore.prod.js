// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../redux/rootReducer";
import indexSaga from "../sagas";

export default function configureStore(initialState) {
  const sagaMiddleWare = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleWare))
  );
  sagaMiddleWare.run(indexSaga);

  return store;
}
