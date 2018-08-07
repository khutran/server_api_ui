import { DELETE_PROJECT_REQUESTED, DELETE_BUILD_PROJECT_REQUESTED } from './../edit/edit.actions';
import { FETCH_PROJECTS_REQUESTED, BUILD_PROJECT_REQUESTED } from './list.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../store/store.module';
import * as _ from 'lodash';
import { NotificationService } from '../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppInjector } from '../../../app-injector';
import { PROJECT_COMP } from '../project.const';
import { GET_ALL_USERS_NO_PAGINATION_REQUESTED, ASSIGN_PROJECT_TO_USER_REQUESTED, UN_ASSIGN_PROJECT_TO_USER_REQUESTED } from '../../user/user.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected navigationSubscription: any;
  protected router: any;
  public store;
  public id_Project;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, router: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.activeRouter = activeRouter;
    this.router = router;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_PROJECTS_REQUESTED, data: this.parseQuery() });
      }
    });
  }

  ngOnInit() {
    // this.store.dispatch({ type: FETCH_PROJECTS_REQUESTED });
  }

  ngOnDestroy() {
    if (!_.isUndefined(this.navigationSubscription)) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private parseQuery(): object {
    let params = {
      page: 1,
      per_page: 20,
      sort: '-created_at'
    };
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.page)) {
      params = _.assign(params, { page: this.activeRouter.snapshot.queryParams.page });
    }
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.search)) {
      params = _.assign(params, { search: this.activeRouter.snapshot.queryParams.search });
    }
    if (!_.isUndefined(this.activeRouter.snapshot.queryParams.order_by)) {
      params = _.assign(params, { orderBy: this.activeRouter.snapshot.queryParams.order_by });
    }
    return params;
  }

  deleteItem(id, name) {
    this.store.dispatch({ type: DELETE_PROJECT_REQUESTED, data: { id: id, name: name } });
  }

  buildItem(id) {
    this.store.dispatch({ type: BUILD_PROJECT_REQUESTED, data: id });
  }

  deleteBuildOfItem(id) {
    this.store.dispatch({ type: DELETE_BUILD_PROJECT_REQUESTED, data: id });
  }

  getAllUser(id) {
    this.id_Project = id;
    this.store.dispatch({ type: GET_ALL_USERS_NO_PAGINATION_REQUESTED, com: PROJECT_COMP, data: { id_project: id } });
  }

  assignProject(userId) {
    this.store.dispatch({ type: ASSIGN_PROJECT_TO_USER_REQUESTED, userId: userId, data: { project_id: this.id_Project } });
  }

  unAsignProject(userId) {
    this.store.dispatch({ type: UN_ASSIGN_PROJECT_TO_USER_REQUESTED, userId: userId, projectId: this.id_Project });
  }
}
