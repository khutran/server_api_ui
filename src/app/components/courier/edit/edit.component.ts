import { GET_COURIER_REQUESTED, EDIT_COURIER_REQUESTED } from './edit.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import store from './../../../store/store.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public store = store;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    store.dispatch({ type: GET_COURIER_REQUESTED, data: this.getItemId() });
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({ type: EDIT_COURIER_REQUESTED, data: (store as any).getState().Courier.edit.item });
    }
  }

  getItemId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
