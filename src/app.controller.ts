import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/hello")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hi")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/bye")
  getBye(): string {
    return this.appService.getHello();
  }
}
