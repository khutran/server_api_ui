import { FETCH_PROJECT_DETAIL_REQUESTED, BUILD_PROJECT_REQUESTED, DELETE_BUILD_PROJECT_REQUESTED } from './detail.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store/store.module';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public store;
  constructor(private activatedRoute: ActivatedRoute, store: Store) {
    this.activatedRoute = activatedRoute;
    this.store = store.getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_PROJECT_DETAIL_REQUESTED, data: this.parseProjectId() });
  }

  parseProjectId() {
    return this.activatedRoute.snapshot.params.id;
  }

  buildItem(id) {
    this.store.dispatch({ type: BUILD_PROJECT_REQUESTED, data: id });
  }

  deleteBuildOfItem(id) {
    this.store.dispatch({ type: DELETE_BUILD_PROJECT_REQUESTED, data: id });
  }
}
