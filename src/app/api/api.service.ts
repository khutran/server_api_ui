import { PermissionService } from './permission/permission.service';
import { CategoryService } from './category/category.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { ProjectService } from './project/project.service';
import { StatusService } from './status/status.service';

@Injectable()
export class ApiService {
  constructor(
    public status: StatusService,
    public auth: AuthService,
    public user: UserService,
    public category: CategoryService,
    public role: RoleService,
    public permission: PermissionService,
    public project: ProjectService
  ) {}
}
