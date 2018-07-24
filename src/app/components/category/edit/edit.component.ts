import { GET_CATEGORY_REQUESTED, EDIT_CATEGORY_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { FETCH_CATEGORIES_REQUESTED } from '../list/list.actions';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public store;

  constructor(private route: ActivatedRoute) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_CATEGORIES_REQUESTED });
    this.store.dispatch({
      type: GET_CATEGORY_REQUESTED,
      data: this.getCategoryId()
    });
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({
        type: EDIT_CATEGORY_REQUESTED,
        data: this.store.getState().Category.edit.item
      });
    }
  }

  getCategoryId() {
    return this.route.snapshot.paramMap.get('id');
  }
}
