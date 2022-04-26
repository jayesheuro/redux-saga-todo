import * as actionTypes from "../Constants/actionTypes";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        error: null,
        user: {},
      };
    default:
      return state;
  }
};
export default userReducer;
