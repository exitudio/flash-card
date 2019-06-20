// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../redux/rootReducer";
import indexSaga from "../sagas";

export default function configureStore(initialState) {
  const sagaMiddleWare = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleWare, thunk, reduxImmutableStateInvariant()),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f // add support for Redux dev tools, if enabled. Otherwise, do nothing.
    )
  );
  sagaMiddleWare.run(indexSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../redux/rootReducer", () => {
      const nextReducer = require("../redux/rootReducer");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
