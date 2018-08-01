import { PermissionService } from './permission/permission.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { ProjectService } from './project/project.service';
import { StatusService } from './status/status.service';
import { FrameworkService } from './framework/framework.service';
import { ServerService } from './server/server.service';
import { CategoryService } from './category/category.service';
import { EnvService } from './env/env.service';

@Injectable()
export class ApiService {
  constructor(
    public category: CategoryService,
    public server: ServerService,
    public framework: FrameworkService,
    public status: StatusService,
    public auth: AuthService,
    public user: UserService,
    public role: RoleService,
    public permission: PermissionService,
    public project: ProjectService,
    public env: EnvService
  ) {}
}
