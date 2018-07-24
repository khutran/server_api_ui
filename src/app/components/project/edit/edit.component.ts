import { GET_PROJECT_REQUESTED, EDIT_PROJECT_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private store = store;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    store.dispatch({ type: GET_PROJECT_REQUESTED, data: this.getItemId() });
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: EDIT_PROJECT_REQUESTED, data: (store as any).getState().Project.edit.item });
    }
  }

  getItemId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
