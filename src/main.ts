import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'src/views/layout'));
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials/layout'));
  app.use(cookieParser());

  app.use(
      session({
        secret: 'fgfgfgfg',
        resave: false,
        saveUninitialized: false,
      }),
  );

  await app.listen(3000);
}
bootstrap();
