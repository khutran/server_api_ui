import { GET_DESIGNER_REQUESTED, EDIT_DESIGNER_REQUESTED } from './edit.actions';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    store.dispatch({
      type: GET_DESIGNER_REQUESTED,
      data: this.getDesignerId()
    });
  }

  onSubmit(form) {
    // console.log((store as any).getState().Designer.edit.item);
    if (form.valid) {
      store.dispatch({
        type: EDIT_DESIGNER_REQUESTED,
        data: (store as any).getState().Designer.edit.item
      });
    }
  }

  getDesignerId() {
    return this.route.snapshot.paramMap.get('id');
  }
}
