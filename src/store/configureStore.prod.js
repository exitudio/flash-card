import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import containerConfig from "../index.container";
import { groupDependenciesFromContainerConfig } from "@dtfni/container-adapter";
const { rootReducer, indexSaga } = groupDependenciesFromContainerConfig(
  containerConfig
);


export default function configureStore(initialState) {
  const sagaMiddleWare = createSagaMiddleware();
  const store= createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleWare,thunk)
    )
  );
  sagaMiddleWare.run(indexSaga);
  return store;
}
