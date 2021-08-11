import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello-candidate')
  helloCandidate(@Request() req) {
    return `Hello Candidate, the current date is ${new Date(
      Date.now(),
    ).toLocaleString()}`;
  }
}
