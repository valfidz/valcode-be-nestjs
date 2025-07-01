import { 
  Controller,
  Get,
  Post,
  Body, 
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  InternalServerErrorException,
  HttpException,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  async loginUser(
    @Body() userData: { email: string; password: string },
  ): Promise<{
    status?: number;
    message: string;
    token?: string;
    data?: {
      id: UserModel["id"];
      name: UserModel["name"];
      email: UserModel["email"];
    }
  }> {
    try {
      const user = await this.authService.signInUser({
        email: userData.email
      })

      if (!user.data) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(userData.password, user.data?.password || '');

      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email
      }

      const token = await this.jwtService.signAsync(payload);

      return {
        status: 200,
        message: 'Login successful',
        token,
        data: {
          id: user.data.id,
          name: user.data.name,
          email: user.data.email
        }
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Login failed');
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  
}
