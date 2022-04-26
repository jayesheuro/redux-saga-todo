import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  todoData: todoReducer,
  userData: userReducer,
});

export default rootReducer;
