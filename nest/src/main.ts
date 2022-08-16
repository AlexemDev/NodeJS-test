import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = process.env.HTTP_PORT || 3000;
  await app.listen(httpPort, () => {
    console.log(`Server started on port ${httpPort}`)
  });
}
bootstrap();
