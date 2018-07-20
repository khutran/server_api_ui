import { fork } from "redux-saga/effects";
import * as _ from "lodash";
import listSaga from "./list/list.saga";

export default _.map([...listSaga], item =>
  fork(item)
);
