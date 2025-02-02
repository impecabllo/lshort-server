import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { formatCodeToUrl, generateRandomShortUrl } from "src/helpers"

import { CreateLinkDto } from "./dto/create-link.dto"
import { Link, LinkDocument } from "./schemas/link.schema"

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {}

  async createShortUrl(data: CreateLinkDto): Promise<{ shortUrl: string; originalUrl: string; urlCode: string }> {
    const { originalUrl } = data

    const shortUrl = generateRandomShortUrl()

    const payload = {
      originalUrl,
      shortUrl,
      clicks: 0,
    }

    const createdLink = new this.linkModel(payload)
    await createdLink.save()

    return {
      shortUrl: formatCodeToUrl(createdLink.shortUrl),
      originalUrl: createdLink.originalUrl,
      urlCode: createdLink.shortUrl,
    }
  }

  async handleRedirect(code: string) {
    const baseUrl = "https://lshort.ru"

    if (!code) {
      const url = baseUrl

      return {
        url,
        statusCode: 302,
      }
    }

    const shortUrl = await this.linkModel.findOne({
      shortUrl: code || "",
    })

    if (!shortUrl) {
      const url = baseUrl

      return {
        url,
        statusCode: 302,
      }
    }

    await this.linkModel.findByIdAndUpdate(shortUrl._id, {
      $inc: {
        clicks: 1,
      },
    })

    return {
      url: shortUrl.originalUrl,
      statusCode: 302,
    }
  }

  async getLinkClicks(code: string): Promise<{ clicks: number; shortUrl: string }> {
    if (!code) {
      return {
        clicks: 0,
        shortUrl: "",
      }
    }

    const link = await this.linkModel.findOne({
      shortUrl: code || "",
    })

    if (!link) {
      return {
        clicks: 0,
        shortUrl: "",
      }
    }

    return {
      clicks: link.clicks,
      shortUrl: formatCodeToUrl(link.shortUrl),
    }
  }
}
