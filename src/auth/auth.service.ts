import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async loginOrSignup(clerkUser: any, email: string) {
    this.logger.log(`Checking DB for user with email: ${email}`);
    const existingUser = await this.findUserByEmail(email);

    if (!existingUser) {
      this.logger.log(`User not found. Creating new user with email: ${email}`);
      try {
        const newUser = await this.prisma.user.create({
          data: {
            username: clerkUser.username || `user_${clerkUser.id}`,
            email,
          },
        });

        this.logger.log(`User created successfully: ${newUser.id}`);
        return {
          message: 'User created successfully',
          user: newUser,
        };
      } catch (err) {
        this.logger.error(`Error creating user: ${err.message}`, err.stack);
        throw new BadRequestException('Failed to create user');
      }
    }

    this.logger.log(`User already exists: ${existingUser.id}`);
    return {
      message: 'User authenticated successfully',
      user: {
        id: clerkUser.id,
        email,
        username: clerkUser.username || existingUser.username,
      },
    };
  }
}
