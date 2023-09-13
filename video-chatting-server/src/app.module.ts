import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosGateway } from './videos/videos.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VideosGateway],
})
export class AppModule {}
