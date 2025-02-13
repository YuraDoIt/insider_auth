// src/users/users.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Реєстрація користувача
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) // Adds description for this endpoint
  @ApiResponse({ status: 201, description: 'User successfully registered.' }) // Success response
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  // Вхід користувача
  @Post('login')
  @ApiOperation({ summary: 'Login a user' }) // Adds description for this endpoint
  @ApiResponse({ status: 200, description: 'User successfully logged in.' }) // Success response
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('alluser')
  async getAllUser() {
    return this.usersService.getAllUser();
  }
}
