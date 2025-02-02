import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { CacheModule } from "@nestjs/cache-manager"

import { LinkModule } from "./link/link.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
