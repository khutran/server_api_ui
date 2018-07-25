import { GET_<%= underscore(name).toUpperCase() %>_REQUESTED, EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { AppInjector } from './../../../app-injector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.<%= styleext %>']
})
export class EditComponent implements OnInit {

  private store;

  constructor(
    private route: ActivatedRoute
  ) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ type: GET_<%= underscore(name).toUpperCase() %>_REQUESTED, data: this.getItemId() });
  }

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({ type: EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED, data: (store as any).getState().<%= classify(name) %>.edit.item });
    }
  }

  getItemId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
