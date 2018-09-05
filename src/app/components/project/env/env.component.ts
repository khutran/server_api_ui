import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../../store/store.module';
import { AppInjector } from '../../../app-injector';
import * as _ from 'lodash';
import { GET_INFO_ENV_REQUESTED, EDIT_INFO_ENV_REQUESTED, ADD_PROPERTIE_ENV_REQUESTED } from './env.actions';
import swal from 'sweetalert2';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
  styleUrls: ['./env.component.scss']
})
export class EnvComponent implements OnInit {
  public store;
  public id_project = this.activatedRoute.snapshot.params.id;
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

  onSubmit() {
    const store = AppInjector.get(Store).getInstance();
    const data = this.store.getState().Project.envedit.inputs;
    store.dispatch({
      type: EDIT_INFO_ENV_REQUESTED,
      data: _.assign(data),
      id: this.activatedRoute.snapshot.params.id
    });
  }

  async addEnv() {
    const store = AppInjector.get(Store).getInstance();
    const { value: environment } = await swal({
      title: 'Add Environment env',
      input: 'text',
      showCancelButton: true,
      inputValidator: value => {
        return !value && 'You need to write something!';
      }
    });

    if (environment) {
      let newEnvironment = {};
      newEnvironment['label'] = environment;
      newEnvironment['key'] = environment;
      store.dispatch({
        type: ADD_PROPERTIE_ENV_REQUESTED,
        data: newEnvironment,
        id: this.activatedRoute.snapshot.params.id
      });
    }
  }
}
