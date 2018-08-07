import { Router } from '@angular/router';
import {
    GET_INFO_ENV_REQUESTED,
    GET_INFO_ENV_SUCCEEDED,
    EDIT_INFO_ENV_REQUESTED,
    EDIT_INFO_ENV_SUCCEEDED,
} from './env.actions';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { API_CALL_ERROR } from './../../../store/action';
import { ApiService } from './../../../api/api.service';
import { AppInjector } from './../../../app-injector';
import { NotificationService } from '../../../common/services/notification/notification.service';

function* getEnv(action) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
        let result = yield api.env.getEnvById(action.data.id).toPromise();
        yield put({ type: GET_INFO_ENV_SUCCEEDED, data: result, id_project: action.data.id });
    } catch (e) {
        yield put({ type: API_CALL_ERROR, error: e });
        router.navigate(['projects']);
    }
}

function* watchGetInfoEnvRequest() {
    yield takeEvery(GET_INFO_ENV_REQUESTED, getEnv);
}

function* editEnv(action) {
    const api = AppInjector.get(ApiService);
    const notification = AppInjector.get(NotificationService);
    try {
        let result = yield api.env.updateEnvById(action.data).toPromise();
        yield put({ type: EDIT_INFO_ENV_SUCCEEDED });
        notification.show('success', 'Update environment file success', 3000);
    } catch (e) {
        yield put({ type: API_CALL_ERROR, error: e });
    }
}

function* watchEditInfoEnvRequest() {
    yield takeEvery(EDIT_INFO_ENV_REQUESTED, editEnv);
}

export default [
    watchGetInfoEnvRequest,
    watchEditInfoEnvRequest
];
