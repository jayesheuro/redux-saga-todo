import * as actionTypes from "../Constants/actionTypes";

export const loginStart = (user) => ({
  type: actionTypes.LOGIN_START,
  payload: user,
});

export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = (err) => ({
  type: actionTypes.LOGIN_FAIL,
  payload: err,
});

export const signupStart = (user) => ({
  type: actionTypes.SIGNUP_START,
  payload: user,
});

export const signupSuccess = (user) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: user,
});

export const signupFail = (err) => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: err,
});
