import { all, fork } from "redux-saga/effects";
import {
  watchGetTodos,
  watchAddTodo,
  watchEditTodo,
  watchDeleteTodo,
} from "./sagas";
import { watchSignup, watchLogin } from "./userSagas";

const sagas = [
  fork(watchGetTodos),
  fork(watchAddTodo),
  fork(watchEditTodo),
  fork(watchDeleteTodo),
  fork(watchSignup),
  fork(watchLogin),
];

export default function* rootSaga() {
  yield all([...sagas]);
}
