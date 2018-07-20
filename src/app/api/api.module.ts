import { CustomerGroupService } from './customer-group/customer-group.service';
import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { EventService } from './event/event.service';
import { ProcessTransitionService } from './process-transition/process-transition.service';
import { StyleService } from './style/style.service';
import { SizeService } from './size/size.service';
import { CustomerService } from './customer/customer.service';
import { ProductService } from './product/product.service';
import { ApiUrl } from './api-url.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { OrderService } from './order/order.service';
import { UserService } from './user/user.service';
import { CategoryService } from './category/category.service';
import { DesignerService } from './designer/designer.service';
import { StatusService } from './status/status.service';
import { ProcessTypesService } from './process-types/process-types.service';
import { ProcessStatusService } from './process-status/process-status.service';
import { DestinationTypeService } from './destination-type/destination-type.service';
import { CustomerAddressService } from './customer-address/customer-address.service';
import { ConstantService } from './constant/constant.service';
import { ProviderService } from './provider/provider.service';
import { CurrencyService } from './currency/currency.service';
import { CourierService } from './courier/courier.service';
import { AnalyticService } from './analytic.service';
import { BroadcastService } from './broadcast/broadcast.service';
import { MediaService } from './media/media.service';
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    ApiService,
    AuthService,
    ProductService,
    OrderService,
    UserService,
    CustomerService,
    CategoryService,
    SizeService,
    DesignerService,
    StyleService,
    StatusService,
    ProcessTypesService,
    ProcessStatusService,
    ProcessTransitionService,
    DestinationTypeService,
    EventService,
    CustomerAddressService,
    RoleService,
    PermissionService,
    ConstantService,
    ProviderService,
    CustomerGroupService,
    AnalyticService,
    CurrencyService,
    CourierService,
    BroadcastService,
    MediaService
  ]
})
export class ApiModule {}
