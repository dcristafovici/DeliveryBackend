import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyAccessToken } from 'src/utils/verifyAccessToken';

@Injectable()
export class ManagerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }

    ctx.manager = await verifyAccessToken(ctx.headers.authorization);
    return true;
  }
}
