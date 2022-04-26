import { applyMiddleware, createStore } from "redux";
import rootReducer from "../Reducers/rootReducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Sagas/rootSaga";

const middlewareSaga = createSagaMiddleware();

const middlewares = [middlewareSaga];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

middlewareSaga.run(rootSaga);

export default store;
