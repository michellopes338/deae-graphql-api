import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaClientService } from 'src/prisma-client';

@Module({
  providers: [UsersResolver, UsersService, PrismaClientService],
})
export class UsersModule {}
