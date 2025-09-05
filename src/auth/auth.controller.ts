import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Get('test')
  @ApiOperation({ summary: 'testing bro' })
  test() {
    console.log('its working');
    return 'hello world';
  }
}
