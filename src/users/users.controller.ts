import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
