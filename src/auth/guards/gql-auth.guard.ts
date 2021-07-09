import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const logger = new Logger('jwt auth guard');

    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req.headers);

    return ctx.getContext().req;
  }
}
