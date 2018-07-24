import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { CategoryService } from './category/category.service';
import { MediaService } from './media/media.service';
import { ApiUrl } from './api-url.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    ApiUrl,
    ApiService,
    AuthService,
    UserService,
    CategoryService,
    RoleService,
    PermissionService,
    MediaService
  ]
})
export class ApiModule {}
