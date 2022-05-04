import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';
import { WebsiteCreatedListener } from './listeners/website-created.listener';
import { WebsiteCreatedGateway } from './gateways/website-created.gateway';
import { WebsitesController } from './websites.controller';

@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([Website])],
  controllers: [WebsitesController],
  providers: [WebsitesService, WebsiteCreatedListener, WebsiteCreatedGateway]
})
export class WebsitesModule {}