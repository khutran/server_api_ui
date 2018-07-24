import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Category } from '../components/category/category.reducer';
import { Acl } from './../components/acl/acl.reducer';
import { Users } from './../components/user/user.reducer';
import { environment } from '../../environments/environment';
import { Print } from './print/print.reducer';
import { Profile } from '../components/profile/profile.reducer';
import { Project } from './../components/project/project.reducer';

const RootReducer = (state = { config: environment }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  Project,
  Auth,
  Category,
  Acl,
  Users,
  Print,
  Profile,
  RootReducer
});
