import { API_CALL_ERROR } from '../../../store/action';
import { CREATE_USER_REQUESTED, CREATE_USER_SUCCEEDED } from '../../auth/create/create.actions';
import { PreloaderService } from '../../../common/services/preloader/preloader.service';
import { AppInjector } from './../../../app-injector';
import { ApiService } from '../../../api/api.service';
import * as _ from 'lodash';
import { takeEvery, put } from 'redux-saga/effects';
import { USER_COMP } from '../user.const';
import { Router } from '@angular/router';
import { UtilityService } from "../../../common/services/utility/utility.service";

function* createUser(action) {
  try {
    AppInjector.get(PreloaderService).show();
    const result = yield AppInjector.get(ApiService)
      .user.create(action.data)
      .toPromise();

    if (!_.isUndefined(action.com)) {
      switch (action.com) {
        case USER_COMP:
          yield put({
            type: CREATE_USER_SUCCEEDED,
            data: result,
            com: action.com
          });
          if (action.redirect) {
            AppInjector.get(Router).navigate([action.redirect]);
          } else {
            AppInjector.get(Router).navigate(['users']);
          }
          AppInjector.get(UtilityService).reset();
          break;

        default:
          break;
      }
    } else {
    }
    AppInjector.get(PreloaderService).hide();
  } catch (e) {
    AppInjector.get(PreloaderService).hide();
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateUserRequest() {
  yield takeEvery(CREATE_USER_REQUESTED, createUser);
}

export default [watchCreateUserRequest];
