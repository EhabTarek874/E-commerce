import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './../../service/token.service';
import { TokenEnum } from 'src/common/enums';
import { Reflector } from '@nestjs/core';
import { tokenName } from 'src/common/decorators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenType: TokenEnum = this.reflector.getAllAndOverride<TokenEnum>(
      tokenName,
      [context.getHandler()],
    );

    console.log({ context, tokenType });
    let req: any;
    let authorization: string = ' ';
    switch (context.getType()) {
      case 'http':
        const HttpCtx = context.switchToHttp();
        req = HttpCtx.getRequest();
        authorization = req.headers.authorization;
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

    const { decoded, user } = await this.tokenService.decodedToken({
      authorization,
      tokenType,
    });
    req.credentials = { decoded, user };
    return true;
  }
}
