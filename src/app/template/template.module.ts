import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';

@NgModule({
  imports: [CommonModule, TemplateRoutingModule, BrowserAnimationsModule, SharedModule],
  declarations: [AdminComponent, AuthComponent],
  providers: [MenuItems]
})
export class TemplateModule {}
