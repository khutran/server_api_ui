import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Acl } from './../components/acl/acl.reducer';
import { Users } from './../components/user/user.reducer';
import { environment } from '../../environments/environment';
import { Print } from './print/print.reducer';
import { Profile } from '../components/profile/profile.reducer';
import { Project } from './../components/project/project.reducer';
import { Status } from './../components/status/status.reducer';
import { Framework } from './../components/framework/framework.reducer';
import { Server } from './../components/server/server.reducer';
import { Category } from './../components/category/category.reducer';
import * as _ from 'lodash';

const RootReducer = (state = { config: environment }, action) => {
  switch (action.type) {
    case 'INIT_APP_MENU':
      const MenuItems = _.map(action.data, item => {
        item.show = action.user.hasOneOf(_.flatten(_.map(item.main, menu => menu.permissions)));
        item.main = _.map(item.main, menu => {
          menu.show = action.user.hasOneOf(menu.permissions);
          return menu;
        });
        return item;
      });
      return { ...state, ...{ MenuItems } };
    default:
      return state;
  }
};

export default combineReducers({
  Category,
  Server,
  Framework,
  Status,
  Project,
  Auth,
  Acl,
  Users,
  Print,
  Profile,
  RootReducer
});
