import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from './../../../store/store.module';
import { FETCH_USER_DETAIL_REQUESTED, UPDATED_USER_REQUESTED, ATTACH_ROLE_TO_USER_REQUESTED, DETACH_ROLE_REQUESTED, ATTACH_ROLES_USER_REQUESTED } from './edit.actions';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public store;
  protected navigationSupscription: Subscription;
  protected roles = [];

  constructor(private notification: NotificationService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.navigationSupscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({
          type: FETCH_USER_DETAIL_REQUESTED,
          data: this.activatedRoute.snapshot.params.id,
          com: USER_COMP
        });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSupscription)) {
      this.navigationSupscription.unsubscribe();
    }
  }

  onSubmit(form) {
    const data = this.store.getState().Users.editUser.item;
    const roles = _.map(_.filter(this.store.getState().Users.editUser.roles, item => item.checked), i => {
      return i.id;
    });
    if (form.valid) {
      this.store.dispatch({
        type: UPDATED_USER_REQUESTED,
        com: USER_COMP,
        data: data
      });
      this.store.dispatch({
        type: ATTACH_ROLES_USER_REQUESTED,
        data: {
          user_id: this.activatedRoute.snapshot.params.id,
          role_ids: roles
        }
      });
    }
  }

  attachRolesToUser() {
    this.store.dispatch({
      type: ATTACH_ROLE_TO_USER_REQUESTED,
      com: USER_COMP,
      data: {
        userId: this.activatedRoute.snapshot.params.id,
        roleId: (this.roles as any).getId()
      }
    });
  }

  detachRoleFromUser(role) {
    this.store.dispatch({
      type: DETACH_ROLE_REQUESTED,
      com: USER_COMP,
      data: {
        userId: this.activatedRoute.snapshot.params.id,
        roleId: role.getId()
      }
    });
  }
}
