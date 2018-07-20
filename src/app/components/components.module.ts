import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DesignerModule } from './designer/designer.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { CurrencyModule } from './currency/currency.module';
import { CourierModule } from './courier/courier.module';
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
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { DesignerComponent } from './designer/designer.component';
import { ProviderComponent } from './provider/provider.component';
import { CurrencyComponent } from './currency/currency.component';
import { CourierComponent } from './courier/courier.component';
import { AclComponent } from './acl/acl.component';
import { UserModule } from './user/user.module';
import { UserComponent } from './user/user.component';
import { CollectionBarcodeComponent } from '../common/print-template/collection-barcode/collection-barcode.component';
import { BarcodeComponent } from '../common/print-template/product-barcode/barcode.component';
import { PrintTemplateModule } from '../common/print-template/print-template.module';
import * as _ from 'lodash';
import { SharedModule } from '../template/shared/shared.module';
import { BreadcrumbsComponent } from '../template/layout/admin/breadcrumbs/breadcrumbs.component';
import { AppMenuItems } from '../template/shared/app-menu-items/app-menu-items';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DashboardComponent,
    MainComponent,
    ProfileComponent,
    ProductComponent,
    CustomerComponent,
    OrderComponent,
    CategoryComponent,
    DesignerComponent,
    AclComponent,
    UserComponent,
    ProviderComponent,
    CurrencyComponent,
    CourierComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    AuthModule,
    ProfileModule,
    ProductModule,
    CustomerModule,
    DesignerModule,
    UserModule,
    CurrencyModule,
    CourierModule,
    SweetAlert2Module,
    PrintTemplateModule,
    BrowserAnimationsModule,
    SettingsModule
  ],
  entryComponents: [BarcodeComponent, CollectionBarcodeComponent],
  providers: [AppMenuItems],
  exports: []
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
