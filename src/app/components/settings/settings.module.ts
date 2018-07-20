import { UiSwitchModule } from 'ng2-ui-switch';
import { DirectivesModule } from './../../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../template/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule, DirectivesModule, SharedModule, UiSwitchModule, FormsModule],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
