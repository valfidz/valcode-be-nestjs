import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signInUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{
    message?: string;
    data?: {
      id: User["id"];
      name: User["name"];
      email: User["email"];
      password: User["password"];
    }
  }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput
      })

      if (!user) {
        return {
          message: "User not found"
        }
      }
  
      return {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
