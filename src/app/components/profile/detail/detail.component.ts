import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { Radio } from '../../../common/directives/dynamic-form/Input/Radio';
import { RENDER_PROFILE_DETAIL_FORM } from './detail.action';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public store;

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'first_name',
        label: 'First name',
        icon: 'fa fa-user',
        required: true,
        classes: ['col-12', 'col-sm-6'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 1
      }),
      new TextBox({
        key: 'last_name',
        label: 'Last Name',
        required: true,
        classes: ['col-12', 'col-sm-6'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 1
      }),
      new TextBox({
        key: 'address',
        label: 'Address',
        icon: 'fa fa-map-marker',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 2
      }),
      new TextBox({
        key: 'email',
        label: 'Email',
        type: 'email',
        icon: 'fa fa-envelope',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 3
      }),
      new TextBox({
        key: 'skype',
        label: 'Skype',
        icon: 'fa fa-skype',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 4
      }),
      new Radio({
        key: 'gender',
        label: 'Gender',
        icon: 'fa fa-mars-double',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        style: 'inline',
        options: [
          {
            key: 'Male',
            value: 'MALE'
          },
          {
            key: 'Female',
            value: 'FEMALE'
          }
        ],
        order: 5
      }),
      new TextBox({
        key: 'twitter',
        label: 'Twitter',
        icon: 'fa fa-twitter',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 6
      }),
      new TextBox({
        key: 'birth',
        label: 'Birth Date',
        icon: 'fa fa-birthday-cake',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 7
      }),
      new TextBox({
        key: 'website',
        label: 'Website',
        icon: 'fa fa-globe',
        classes: ['col-12', 'col-sm-12'],
        group_classes: ['col-12', 'col-sm-6'],
        order: 8
      })
    ];
    this.store.dispatch({ type: RENDER_PROFILE_DETAIL_FORM, data: inputs });
  }

  onSubmit(form) {
    console.log(form.value);
  }
}
