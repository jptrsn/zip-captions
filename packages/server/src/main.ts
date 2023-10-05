import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app/app.module';
import { PeerServerService } from './app/services/peer-server/peer-server.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://*.zipcaptions.app'
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  const peerServerService = app.get(PeerServerService);
  peerServerService.enablePeerServer(app);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
