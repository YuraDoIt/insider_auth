import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantEntity } from './entity/participants.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/events/entity/event.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ParticipantEntity, EventEntity]),
    ],
  providers: [ParticipantsService],
  controllers: [ParticipantsController]
})
export class ParticipantsModule {}
