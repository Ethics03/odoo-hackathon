import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(
    private readonly authservice: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  @Post('test')
  @ApiOperation({ summary: 'testing bro' })
  test(@Req() req: Request & { user?: any }) {
    console.log('its working');
    console.log(req.user);
    return req.user;
  }

  @Post('user/:email')
  @ApiOperation({ summary: 'Get user by email' })
  async findUserByEmail(@Param('email') email: string) {
    this.logger.log(`Fetching user with email: ${email}`);
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.authservice.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  async login(@Req() req: Request & { user: any }) {
    this.logger.log('Login endpoint hit');

    const clerkUser = req.user;
    if (!clerkUser?.emailAddresses?.[0]?.emailAddress) {
      this.logger.error('No email found in Clerk user data');
      throw new BadRequestException('User email not provided');
    }

    const email = clerkUser.emailAddresses[0].emailAddress;
    this.logger.log(`Email extracted: ${email}`);
    this.logger.log(`Attempting login for email: ${email}`);

    return this.authservice.loginOrSignup(clerkUser, email);
  }
}
