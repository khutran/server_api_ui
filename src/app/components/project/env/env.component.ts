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

  onSubmit(form) {
    if (form.valid) {
      const store = AppInjector.get(Store).getInstance();
      const data = form.value;
      store.dispatch({
        type: EDIT_INFO_ENV_REQUESTED,
        data: _.assign(data),
        id: this.activatedRoute.snapshot.params.id
      });
    } else {
      console.log('form is not valid');
    }
  }

  async addEnv() {
    const store = AppInjector.get(Store).getInstance();
    const { value: environment } = await swal({
      title: 'Add Environment env',
      html: 'environment <input id="key" class="swal2-input">' + 'value <input id="value" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [(document.getElementById('key') as any).value, (document.getElementById('value') as any).value];
      }
    });

    if (environment) {
      let newEnvironment = {};
      newEnvironment[environment[0]] = environment[1];
      let data = store.getState().Project.envedit.env;
      store.dispatch({
        type: ADD_PROPERTIE_ENV_REQUESTED,
        data: _.assign(_.assign(data, newEnvironment)),
        id: this.activatedRoute.snapshot.params.id
      });
    }
  }
}
