import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Get("/")
  helloWorld() {
    return JSON.stringify("{code: 200}")
  }
}
