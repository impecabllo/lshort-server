import { Body, Controller, Get, Param, Post, Redirect } from "@nestjs/common"

import { LinkService } from "./link.service"

import { CreateLinkDto } from "./dto/create-link.dto"

@Controller("link")
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Post()
  shortUrl(@Body() data: CreateLinkDto) {
    return this.linkService.createShortUrl(data)
  }

  @Get(":code")
  @Redirect("https://lshort.ru", 302)
  redirect(@Param() params: { code: string }) {
    return this.linkService.handleRedirect(params.code)
  }

  @Get("clicks/:code")
  clicksCount(@Param() params: { code: string }) {
    return this.linkService.getLinkClicks(params.code)
  }
}
