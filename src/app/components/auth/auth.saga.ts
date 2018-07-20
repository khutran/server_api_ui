import { fork } from "redux-saga/effects";
import * as _ from "lodash";
import loginSaga from "./login/login.saga";
import createSaga from "./create/create.saga";
import forgotPasswordSaga from "./forgot-password/forgot-password.saga";
import resetPasswordSaga from "./reset-password/reset-password.saga";

export default _.map(
  [...loginSaga, ...createSaga, ...forgotPasswordSaga, ...resetPasswordSaga],
  item => fork(item)
);
