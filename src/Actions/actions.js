import * as actionTypes from "../Constants/actionTypes";

export const getTodosStart = () => ({
  type: actionTypes.GET_TODOS_START,
});

export const getTodosSuccess = (todos) => ({
  type: actionTypes.GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFail = (error) => ({
  type: actionTypes.GET_TODOS_FAIL,
  payload: error,
});

export const addTodoStart = (todo) => ({
  type: actionTypes.ADD_TODO_START,
  payload: todo,
});

export const addTodoSuccess = () => ({
  type: actionTypes.ADD_TODO_SUCCESS,
});

export const addTodoFail = (error) => ({
  type: actionTypes.ADD_TODO_FAIL,
  payload: error,
});

export const editTodoStart = (todoDetail) => ({
  type: actionTypes.EDIT_TODO_START,
  payload: todoDetail,
});

export const editTodoSuccess = () => ({
  type: actionTypes.EDIT_TODO_SUCCESS,
});

export const editTodoFail = (error) => ({
  type: actionTypes.EDIT_TODO_FAIL,
  payload: error,
});

export const deleteTodoStart = (id) => ({
  type: actionTypes.DELETE_TODO_START,
  payload: id,
});
export const deleteTodoSuccess = () => ({
  type: actionTypes.DELETE_TODO_SUCCESS,
});
export const deleteTodoFail = (error) => ({
  type: actionTypes.DELETE_TODO_FAIL,
  payload: error,
});
