import * as actionTypes from "../Constants/actionTypes";

const initialState = {
  loading: false,
  error: null,
  todos: {},
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TODOS_START:
    case actionTypes.ADD_TODO_START:
    case actionTypes.EDIT_TODO_START:
    case actionTypes.DELETE_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case actionTypes.ADD_TODO_SUCCESS:
    case actionTypes.EDIT_TODO_SUCCESS:
    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.GET_TODOS_FAIL:
    case actionTypes.ADD_TODO_FAIL:
    case actionTypes.EDIT_TODO_FAIL:
    case actionTypes.DELETE_TODO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default todoReducer;
