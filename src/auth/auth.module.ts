// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';  // Make sure UsersModule is imported
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';  // Add the guard to your module

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with an environment variable for production
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],  // Make sure both are added to providers
  exports: [JwtAuthGuard],  // Export the guard if you plan to use it in other modules
})
export class AuthModule {}
