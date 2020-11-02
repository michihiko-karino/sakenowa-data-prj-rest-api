import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IdAndQuery = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;

    return { id, ...request.query };
  },
);
