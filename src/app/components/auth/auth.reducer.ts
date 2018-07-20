import { combineReducers } from 'redux';
import { login } from './login/login.reducer';
import { create } from './create/create.reducer';
import { forgotPassword } from './forgot-password/forgot-password.reducer';
import { resetPassword } from './reset-password/reset-password.reducer';

export const Auth = combineReducers({
  login, create, forgotPassword, resetPassword
});