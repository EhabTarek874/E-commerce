import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roleName } from 'src/common/decorators/role.decorators';
import { RoleEnum } from 'src/common/enums';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
   canActivate(context: ExecutionContext):boolean{
    const accessRoles: RoleEnum[] = this.reflector.getAllAndOverride<RoleEnum[]>(
      roleName,
      [context.getHandler()],
    )??[]

    console.log({ context, accessRoles });

    let role:RoleEnum = RoleEnum.user;
    switch (context.getType()) {
      case 'http':
      role = context.switchToHttp().getRequest().credentials.user.role
        break;

        // case "rpc":
        // const RPctx = context.switchToRpc()
        // break;

        // case "ws":
        // const WSctx = context.switchToWs()
        break;
      default:
        break;
    }
    return accessRoles.includes(role);
  }
}
