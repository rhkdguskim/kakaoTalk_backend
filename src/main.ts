import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';
import * as config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server')
  setupSwagger(app);
  await app.listen(serverConfig.port);
}
bootstrap();