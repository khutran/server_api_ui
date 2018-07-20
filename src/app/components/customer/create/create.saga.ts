import { Router } from "@angular/router";
import { API_CALL_ERROR } from "./../../../store/action";
import { AppInjector } from "./../../../app-injector";
import { CREATE_CUSTOMER_REQUESTED } from "./create.actions";
import { ApiService } from "../../../api/api.service";
import { takeEvery, put } from "redux-saga/effects";
import * as _ from "lodash";
import { CREATE_CUSTOMER_ADDRESS_REQUESTED } from "../edit/edit.actions";
import { PreloaderService } from "../../../common/services/preloader/preloader.service";

function* createCustomer(action) {
  AppInjector.get(PreloaderService).show();
  const api = AppInjector.get(ApiService);
  try {
    let result = yield api.user.create(action.data).toPromise();
    AppInjector.get(PreloaderService).hide();
    AppInjector.get(Router).navigate([`/customer/edit/${result.getId()}/account-info`]);
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateCustomerRequest() {
  yield takeEvery(CREATE_CUSTOMER_REQUESTED, createCustomer);
}

export default [watchCreateCustomerRequest];
