import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EventEntity } from './events/entity/event.entity';
import { ParticipantEntity } from './participants/entity/participants.entity';
import { UserEntity } from './users/entity/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST', '127.0.0.1'),
            port: this.configService.get<number>('DB_PORT', 5432),
            username: this.configService.get<string>('DB_USERNAME', 'postgres'),
            password: this.configService.get<string>('DB_PASSWORD', '12345'),
            database: this.configService.get<string>('DB_DATABASE', 'auth'),
            entities: [UserEntity, EventEntity, ParticipantEntity],
            synchronize: true, 
            migrationsRun: true,
            logging: true,
            autoLoadEntities: true,
        };
    }
}
