import { SEND_COMMAND_REQUESTED, SEND_COMMAND_SUCCESSED } from './command.actions';
import { RENDER_CREATE_COMMAND_FORM_REQUESTED } from './command.actions';
import { FETCH_PROJECT_DETAIL_REQUESTED } from '../detail/detail.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store/store.module';
import { InputBase } from '../../../common/directives/dynamic-form/Input/InputBase';
import { TextBox } from '../../../common/directives/dynamic-form/Input/TextBox';
import { AppInjector } from '../../../app-injector';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  public store;
  constructor(private activatedRoute: ActivatedRoute, store: Store) {
    this.activatedRoute = activatedRoute;
    this.store = store.getInstance();
  }

  ngOnInit() {
    let inputs: InputBase<any>[] = [
      new TextBox({
        key: 'command',
        label: 'mand',
        required: true,
        classes: ['col'],
        group_classes: ['col-12'],
        order: 1
      })
    ];
    this.store.dispatch({ type: RENDER_CREATE_COMMAND_FORM_REQUESTED, data: { inputs: inputs } });
    this.store.dispatch({ type: FETCH_PROJECT_DETAIL_REQUESTED, data: this.parseProjectId() });
    this.store.dispatch({ type: SEND_COMMAND_SUCCESSED, data: '' });
  }

  parseProjectId() {
    return this.activatedRoute.snapshot.params.id;
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    const id = store.getState().Project.detail.item.id;
    if (form.value) {
      store.dispatch({ type: SEND_COMMAND_REQUESTED, data: { id: id, command: form.value.command } });
    }
  }
}
