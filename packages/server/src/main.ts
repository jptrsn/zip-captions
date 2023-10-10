import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app/app.module';
import { PeerServerService } from './app/services/peer-server/peer-server.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Validate request data types
  app.useGlobalPipes(new ValidationPipe());

  // Set CORS policy
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });

  // Use auth sessions
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());

  // Set global API version
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  // Enable peer JS server
  const peerServerService = app.get(PeerServerService);
  peerServerService.enablePeerServer(app);

  // Enable web server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
