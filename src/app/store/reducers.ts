import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Category } from '../components/category/category.reducer';
import { Acl } from './../components/acl/acl.reducer';
import { Users } from './../components/user/user.reducer';
import { environment } from '../../environments/environment';
import { Print } from './print/print.reducer';
import { Profile } from '../components/profile/profile.reducer';
import { Project } from './../components/project/project.reducer';
import { Status } from './../components/status/status.reducer';
import { Framework } from './../components/framework/framework.reducer';
import { Server } from './../components/server/server.reducer';

const RootReducer = (state = { config: environment }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  Server,
  Framework,
  Status,
  Project,
  Auth,
  Category,
  Acl,
  Users,
  Print,
  Profile,
  RootReducer
});
