import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('test')
  @ApiOperation({ summary: 'testing bro' })
  test(@Req() req: Request & { user?: any }) {
    console.log('its working');
    console.log(req.user);
    return req.user;
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Creating User in DB' })
  async createUser(@Body() payload: CreateUserDTO) {
    try {
      const user = await this.authservice.createUser(payload);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:email')
  @ApiOperation({ summary: 'Getting User by Email' })
  async findUserByEmail(@Param('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return await this.authservice.findUserByEmail(email);
  }

  @Get('login')
  @ApiOperation({ summary: 'Logging in user' })
  login(@Req() req: Request & { user: any }) {
    const user = req.user;
    return {
      message: 'User authenticated successfully',
      user: {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
        username: user.username,
      },
    };
  }
}
