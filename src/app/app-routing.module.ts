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
        path: 'category',
        component: CategoryComponent,
        loadChildren: './components/category/category.module#CategoryModule'
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
