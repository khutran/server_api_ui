import { GET_<%= underscore(name).toUpperCase() %>_REQUESTED, EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.<%= styleext %>']
})
export class EditComponent implements OnInit {

  private store = store;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    store.dispatch({ type: GET_<%= underscore(name).toUpperCase() %>_REQUESTED, data: this.getItemId() });
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: EDIT_<%= underscore(name).toUpperCase() %>_REQUESTED, data: (store as any).getState().<%= classify(name) %>.edit.item });
    }
  }

  getItemId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
