import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type LinkDocument = HydratedDocument<Link>

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ required: true })
  originalUrl: string

  @Prop({ required: true, unique: true })
  shortUrl: string

  @Prop({ required: true, default: 0 })
  clicks: number
}

export const LinkSchema = SchemaFactory.createForClass(Link)
