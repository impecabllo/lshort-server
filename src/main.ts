import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"

import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    })
  )

  const whitelist = ["https://lshort.ru", "https://www.lshort.ru"]

  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV === "development" || !origin) {
        callback(null, true)
      } else {
        console.error(origin)
        callback(new Error("Not allowed by CORS"))
      }
    },
  })

  await app.listen(3001)
}
bootstrap()
