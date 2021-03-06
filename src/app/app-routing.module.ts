import { UserComponent } from './components/user/user.component';
import { AclComponent } from './components/acl/acl.component';
import { MainComponent } from './components/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { ProjectComponent } from './components/project/project.component';
import { StatusComponent } from './components/status/status.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { ServerComponent } from './components/server/server.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: 'app/components/profile/profile.module#ProfileModule'
      },
      {
        path: 'categories',
        component: CategoryComponent,
        loadChildren: './components/category/category.module#CategoryModule'
      },
      {
        path: 'status',
        component: StatusComponent,
        loadChildren: './components/status/status.module#StatusModule'
      },
      {
        path: 'frameworks',
        component: FrameworkComponent,
        loadChildren: './components/framework/framework.module#FrameworkModule'
      },
      {
        path: 'servers',
        component: ServerComponent,
        loadChildren: './components/server/server.module#ServerModule'
      },
      {
        path: 'projects',
        component: ProjectComponent,
        loadChildren: './components/project/project.module#ProjectModule'
      },
      {
        path: 'acl',
        component: AclComponent,
        loadChildren: './components/acl/acl.module#AclModule'
      },
      {
        path: 'users',
        component: UserComponent,
        loadChildren: './components/user/user.module#UserModule'
      },
      {
        path: 'settings',
        loadChildren: './components/settings/settings.module#SettingsModule'
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: 'app/components/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      useHash: false,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
