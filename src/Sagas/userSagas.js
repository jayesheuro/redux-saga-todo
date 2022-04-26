import { takeLatest, put } from "redux-saga/effects";
import * as actionTypes from "../Constants/actionTypes";
import firebaseDb from "../Config/firebase";
import bcrypt from "bcryptjs";
import {
  loginSuccess,
  loginFail,
  signupFail,
  signupSuccess,
} from "../Actions/userActions";

//workers
function* signupStart({ payload: user }) {
  try {
    yield firebaseDb.child("users").push(user);
    yield put(signupSuccess(user));
  } catch (error) {
    yield put(signupFail(error));
  }
}
function* loginStart({ payload: user }) {
  try {
    const users = yield new Promise((resolve) =>
      firebaseDb.child("users").on("value", resolve)
    );
    // yield console.log(users.val());
    if (users.val() !== null) {
      let userDetails = Object.values(users.val()).filter(
        (u) => u.username === user.username
      )[0];
      if (!userDetails) {
        yield put(loginFail("User does not exist"));
        alert("User does not exist");
        return;
      } else {
        let passwordsMatch = bcrypt.compareSync(
          user.password,
          userDetails.passwordHash
        );
        if (passwordsMatch === true) {
          yield put(loginSuccess(userDetails));
        } else {
          yield put(loginFail("Username and Password do not match"));
          alert("Username and Password do not match");
          return;
        }
      }
    } else {
      yield put(loginSuccess({}));
    }
  } catch (error) {
    yield put(loginFail(error));
  }
}

//watchers
export function* watchSignup() {
  yield takeLatest(actionTypes.SIGNUP_START, signupStart);
}
export function* watchLogin() {
  yield takeLatest(actionTypes.LOGIN_START, loginStart);
}
