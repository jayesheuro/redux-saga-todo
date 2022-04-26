import { takeLatest, put } from "redux-saga/effects";
import * as actionTypes from "../Constants/actionTypes";
import firebaseDb from "../Config/firebase";
import {
  getTodosSuccess,
  getTodosFail,
  addTodoSuccess,
  addTodoFail,
  editTodoSuccess,
  editTodoFail,
  deleteTodoSuccess,
  deleteTodoFail,
} from "../Actions/actions";

//workers

function* getTodos() {
  try {
    const todos = yield new Promise((resolve) =>
      firebaseDb.child("todos").on("value", resolve)
    );
    if (todos.val() !== null) {
      yield put(getTodosSuccess(todos.val()));
    } else {
      yield put(getTodosSuccess({}));
    }
  } catch (error) {
    yield put(getTodosFail(error));
  }
}

function* addTodo({ payload: todo }) {
  try {
    yield firebaseDb.child("todos").push(todo);
    yield put(addTodoSuccess());
  } catch (error) {
    yield put(addTodoFail(error));
  }
}
function* editTodo(action) {
  yield console.log(action.payload);
  try {
    yield firebaseDb
      .child(`todos/${action.payload["id"]}`)
      .set(action.payload["todo"]);
    yield put(editTodoSuccess());
  } catch (error) {
    yield put(editTodoFail(error));
  }
}
function* deleteTodo({ payload: id }) {
  try {
    yield firebaseDb.child(`todos/${id}`).remove();
    yield put(deleteTodoSuccess());
  } catch (error) {
    yield put(deleteTodoFail());
  }
}

//watchers

export function* watchGetTodos() {
  yield takeLatest(actionTypes.GET_TODOS_START, getTodos);
}
export function* watchAddTodo() {
  yield takeLatest(actionTypes.ADD_TODO_START, addTodo);
}
export function* watchEditTodo() {
  yield takeLatest(actionTypes.EDIT_TODO_START, editTodo);
}
export function* watchDeleteTodo() {
  yield takeLatest(actionTypes.DELETE_TODO_START, deleteTodo);
}
