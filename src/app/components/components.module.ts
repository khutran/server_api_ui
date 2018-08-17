import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AuthModule } from './auth/auth.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ProfileModule } from './profile/profile.module';
import { ProfileComponent } from './profile/profile.component';
import { AclComponent } from './acl/acl.component';
import { UserModule } from './user/user.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../template/shared/shared.module';
import { BreadcrumbsComponent } from '../template/layout/admin/breadcrumbs/breadcrumbs.component';
import { SettingsModule } from './settings/settings.module';
import { ProjectModule } from './project/project.module';
import { ProjectComponent } from './project/project.component';
import { StatusComponent } from './status/status.component';
import { StatusModule } from './status/status.module';
import { FrameworkComponent } from './framework/framework.component';
import { FrameworkModule } from './framework/framework.module';
import { ServerComponent } from './server/server.component';
import { ServerModule } from './server/server.module';
import { CategoryComponent } from './category/category.component';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    CategoryComponent,
    ServerComponent,
    FrameworkComponent,
    StatusComponent,
    PageNotFoundComponent,
    DashboardComponent,
    MainComponent,
    ProfileComponent,
    AclComponent,
    UserComponent,
    BreadcrumbsComponent,
    ProjectComponent
  ],
  imports: [
    CategoryModule,
    ServerModule,
    FrameworkModule,
    StatusModule,
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    AuthModule,
    ProfileModule,
    UserModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    SettingsModule,
    ProjectModule
  ],
  exports: []
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
