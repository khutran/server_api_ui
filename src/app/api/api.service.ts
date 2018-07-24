import { MediaService } from './media/media.service';
import { CustomerGroupService } from './customer-group/customer-group.service';
import { PermissionService } from './permission/permission.service';
import { DestinationTypeService } from './destination-type/destination-type.service';
import { ProcessTransitionService } from './process-transition/process-transition.service';
import { StyleService } from './style/style.service';
import { SizeService } from './size/size.service';
import { CategoryService } from './category/category.service';
import { CustomerService } from './customer/customer.service';
import { OrderService } from './order/order.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { DesignerService } from './designer/designer.service';
import { StatusService } from './status/status.service';
import { ProcessTypesService } from './process-types/process-types.service';
import { ProcessStatusService } from './process-status/process-status.service';
import { CustomerAddressService } from './customer-address/customer-address.service';
import { RoleService } from './role/role.service';
import { ProviderService } from './provider/provider.service';
import { CurrencyService } from './currency/currency.service';
import { CourierService } from './courier/courier.service';

@Injectable()
export class ApiService {
  constructor(
    public auth: AuthService,
    public order: OrderService,
    public user: UserService,
    public customer: CustomerService,
    public category: CategoryService,
    public size: SizeService,
    public designer: DesignerService,
    public style: StyleService,
    public status: StatusService,
    public processType: ProcessTypesService,
    public processStatus: ProcessStatusService,
    public processTransition: ProcessTransitionService,
    public destinationType: DestinationTypeService,
    public customerAddress: CustomerAddressService,
    public role: RoleService,
    public permission: PermissionService,
    public provider: ProviderService,
    public customerGroup: CustomerGroupService,
    public currency: CurrencyService,
    public courier: CourierService,
    public media: MediaService
  ) {}
}
