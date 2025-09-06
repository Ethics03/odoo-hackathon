import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async loginOrSignup(clerkUser: any, email: string) {
    this.logger.log(`Processing login/signup for email: ${email}`);

    let existingUser = await this.findUserByEmail(email);
    let isNewUser = false;

    if (!existingUser) {
      this.logger.log(`User with email ${email} not found, creating new user`);
      try {
        const userData = {
          email: email,
          username:
            clerkUser.username ||
            clerkUser.firstName ||
            clerkUser.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
            `user_${clerkUser.id}`,
        };

        existingUser = await this.createUser(userData);
        isNewUser = true;
        this.logger.log(`New user created for email: ${email}`);
      } catch (error) {
        this.logger.error(`Failed to create user: ${error.message}`);
        throw new BadRequestException(`User creation failed: ${error.message}`);
      }
    } else {
      this.logger.log(`Existing user found for email: ${email}`);
    }

    return {
      success: true,
      userData: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        createdAt: existingUser.createdAt,
      },
      isNewUser,
    };
  }

  async createUser(userData: {
    email: string;
    username: string;
    [key: string]: any;
  }) {
    return await this.prisma.user.create({
      data: userData,
    });
  }
}
