import { FETCH_PROJECT_DETAIL_REQUESTED, BUILD_PROJECT_REQUESTED, DELETE_BUILD_PROJECT_REQUESTED } from './detail.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store/store.module';
import { ServiceProvider } from './../../../api/service.provider';
import swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public store;
  public service;
  public urlDownload_Db;
  public urlDownload_Source;
  constructor(private activatedRoute: ActivatedRoute, store: Store) {
    this.activatedRoute = activatedRoute;
    this.store = store.getInstance();
    this.service = new ServiceProvider();
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_PROJECT_DETAIL_REQUESTED, data: this.parseProjectId() });
    this.urlDownload_Db = this.service.apiUrl.getApiUrl('/api/v1/remote/project') + '/' + this.parseProjectId() + '/' + 'download/database';
    this.urlDownload_Source = this.service.apiUrl.getApiUrl('/api/v1/remote/project') + '/' + this.parseProjectId() + '/' + 'download/source';
  }

  parseProjectId() {
    return this.activatedRoute.snapshot.params.id;
  }

  async buildItem(id, name, build_time) {
    let text = `<div style='display:${build_time === 0 ? 'node' : 'inherit'}'><input type='checkbox' id='swal-input1' value=''> Import Database</div>`;
    const { value: accept } = await swal({
      type: 'warning',
      title: `Build project ${name}`,
      html: text,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Build <i class="fa fa-arrow-right></i>',
      preConfirm: () => {
        return new Promise(resolve => {
          resolve([(document.getElementById('swal-input1') as any).checked]);
        });
      }
    });

    if (!_.isNil(accept)) {
      this.store.dispatch({ type: BUILD_PROJECT_REQUESTED, data: { id: id, build_time: build_time, accept: accept[0] } });
    }
  }

  // buildItem(id, build_time) {
  //   this.store.dispatch({ type: BUILD_PROJECT_REQUESTED, data: { id: id, build_time: build_time } });
  // }

  deleteBuildOfItem(id) {
    this.store.dispatch({ type: DELETE_BUILD_PROJECT_REQUESTED, data: id });
  }
}
