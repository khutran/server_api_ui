import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { Store } from '../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import * as _ from 'lodash';
import { GET_INFO_ENV_REQUESTED, EDIT_INFO_ENV_REQUESTED } from './env.actions';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
  styleUrls: ['./env.component.scss']
})
export class EnvComponent implements OnInit {

  public store;
  public id_project = +this.activatedRoute.snapshot.params.id;
  constructor(private activatedRoute: ActivatedRoute, store: Store) {
    this.activatedRoute = activatedRoute;
    this.store = store.getInstance();
  }

  ngOnInit() {
    this.store.dispatch({ 
      type: GET_INFO_ENV_REQUESTED, 
      data: { 
        id: this.activatedRoute.snapshot.params.id 
      } 
    });
  }

  onSubmit(form) {
    if (form.valid) {
      const store = AppInjector.get(Store).getInstance();
      const data = form.value;
      store.dispatch({
        type: EDIT_INFO_ENV_REQUESTED,
        data: _.assign(data, { id: store.getState().Project.envedit.env.id_project })
      });
    }else {
      console.log('form is not valid');
    }
  }

}
