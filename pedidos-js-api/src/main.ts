import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from "@nestjs/common"
import { useContainer } from "class-validator"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable Class-Validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .setContact('Thiago Elias', 'https://github.com/thiagoelias99', 'thiagoelias99@gmail.com')
    .setLicense('MIT', 'https://www.mit.edu/~amini/LICENSE.md')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT ?? 3333)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`Swagger is available on: ${await app.getUrl()}/docs`)
}

bootstrap()
