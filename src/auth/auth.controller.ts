import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Post('test')
  @ApiOperation({ summary: 'testing bro' })
  test() {
    console.log('its working');
    return 'hello world';
  }
}
