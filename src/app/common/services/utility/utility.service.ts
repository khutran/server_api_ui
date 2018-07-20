import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import Redirect from '../../../models/Redirect';
import * as _ from 'lodash';

@Injectable()
export class UtilityService {

  public router: Router;
  public redirect: Redirect;

  constructor(private activeRouter: ActivatedRoute, router: Router) {
    this.activeRouter = activeRouter;
    this.router = router;
  }

  public getQuery(defaultParams = { page: 1, per_page: 100 }): object {
    let supportedParams = ['sort', 'constraints', 'page', 'per_page', 'search'];
    let queryParams = { page: defaultParams.page, per_page: defaultParams.per_page };
    if (_.keys(this.activeRouter.snapshot.queryParams).length > 0) {
      queryParams = _.assign(queryParams, this.activeRouter.snapshot.queryParams);
    }
    return _.pick(queryParams, supportedParams);
  }

  public nextPageWithReferer(page: any[], redirectData: Redirect) {
    this.redirect = redirectData;
    this.router.navigate(page);
  }

  public reset() {
    this.redirect = new Redirect();
  }

  public getRedirectData() {
    if (this.redirect) {
      return this.redirect;
    } else {
      return new Redirect();
    }
  }
}
