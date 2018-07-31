import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ApiUrl } from './api-url.service';
import { ProjectService } from './project/project.service';
import { StatusService } from './status/status.service';
import { FrameworkService } from './framework/framework.service';
import { ServerService } from './server/server.service';
import { CategoryService } from './category/category.service';
@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [CategoryService, ServerService, FrameworkService, StatusService, ApiUrl, ApiService, AuthService, UserService, RoleService, PermissionService, ProjectService]
})
export class ApiModule {}
