// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';  // Для хешування паролів
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entity/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,  // Для генерації JWT токенів
  ) {}

  // Реєстрація користувача
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username, email, password } = registerUserDto;
    const existingUser = await this.usersRepository.findOne({ where: [{ email }, { username }] });

    if (existingUser) {
      throw new Error('User with that email or username already exists');
    }

    // Хешуємо пароль перед збереженням
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('1')
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getAllUser() {
    return this.usersRepository.find();  // Assuming `usersRepository` is the TypeORM repository for users.
  }

}
