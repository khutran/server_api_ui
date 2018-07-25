import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { CategoryService } from './category/category.service';
import { ApiUrl } from './api-url.service';
import { ProjectService } from './project/project.service';
import { StatusService } from './status/status.service';
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [StatusService, ApiUrl, ApiService, AuthService, UserService, CategoryService, RoleService, PermissionService, ProjectService]
})
export class ApiModule {}
