import { DirectivesModule } from './../../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, DirectivesModule],
  declarations: [DetailComponent]
})
export class ProfileModule {}
