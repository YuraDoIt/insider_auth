import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './user.controler';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'topsecret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
