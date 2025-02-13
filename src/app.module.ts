import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { EventEntity } from './events/entity/event.entity';
import { ParticipantsModule } from './participants/participants.module';
import { ParticipantEntity } from './participants/entity/participants.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_host,
      port: process.env.DB_port ? + process.env.DB_port : 5433,
      username: 'postgres',
      password: '12345',
      database: 'auth',
      entities: [UserEntity, EventEntity, ParticipantEntity],
      synchronize: true,
      migrationsRun: true,
      logging: true,
    }),
    EventsModule,
    ParticipantsModule,
  ],
})
export class AppModule { }
