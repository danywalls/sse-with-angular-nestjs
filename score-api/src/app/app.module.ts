import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/games.controller';

@Module({
  imports: [],
  controllers: [AppController, GamesController],
  providers: [AppService],
})
export class AppModule {}
