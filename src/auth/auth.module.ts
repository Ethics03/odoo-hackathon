import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from 'src/prisma/prisma.service';
import { ClerkClientProvider } from 'src/providers/clerk.provider';
import { ClerkStrategy } from './clerk.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, PrismaService, ClerkStrategy, ClerkClientProvider],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
