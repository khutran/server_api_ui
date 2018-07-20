import { UserComponent } from './components/user/user.component';
import { AclComponent } from './components/acl/acl.component';
import { ProductComponent } from './components/product/product.component';
import { MainComponent } from './components/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { CategoryComponent } from './components/category/category.component';
import { DesignerComponent } from './components/designer/designer.component';
import { ProviderComponent } from './components/provider/provider.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { CourierComponent } from './components/courier/courier.component';
import { SettingsComponent } from './components/settings/settings.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
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
        path: 'product',
        component: ProductComponent,
        loadChildren: './components/product/product.module#ProductModule'
      },
      {
        path: 'customer',
        component: CustomerComponent,
        loadChildren: './components/customer/customer.module#CustomerModule'
      },
      {
        path: 'order',
        component: OrderComponent,
        loadChildren: './components/order/order.module#OrderModule'
      },
      {
        path: 'category',
        component: CategoryComponent,
        loadChildren: './components/category/category.module#CategoryModule'
      },
      {
        path: 'designer',
        component: DesignerComponent,
        loadChildren: './components/designer/designer.module#DesignerModule'
      },
      {
        path: 'acl',
        component: AclComponent,
        loadChildren: './components/acl/acl.module#AclModule'
      },
      {
        path: 'user',
        component: UserComponent,
        loadChildren: './components/user/user.module#UserModule'
      },
      {
        path: 'provider',
        component: ProviderComponent,
        loadChildren: './components/provider/provider.module#ProviderModule'
      },
      {
        path: 'currency',
        component: CurrencyComponent,
        loadChildren: './components/currency/currency.module#CurrencyModule'
      },
      {
        path: 'courier',
        component: CourierComponent,
        loadChildren: './components/courier/courier.module#CourierModule'
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
