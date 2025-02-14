import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { EventEntity } from './events/entity/event.entity';
import { ParticipantsModule } from './participants/participants.module';
import { ParticipantEntity } from './participants/entity/participants.entity';
import ormconfig from './config/typeorm-config'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
    EventsModule,
    ParticipantsModule,
  ],
})
export class AppModule { }
