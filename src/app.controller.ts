import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger/dist/decorators/api-exclude-endpoint.decorator';

@Controller()
export class AppController {
  @Get('/favicon.ico')
  @ApiExcludeEndpoint()
  @HttpCode(204)
  favicon(): void {
    return;
  }
}
