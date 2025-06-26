import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<{
    status?: number;
    message: string;
    data?: {
      id: UserModel["id"];
      name: UserModel["name"];
      email: UserModel["email"];
    }
  }> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
  
      const result = await this.userService.createUser(userData);
      
      return result;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
