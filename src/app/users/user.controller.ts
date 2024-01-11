import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: id });
  }

  @Post()
  async signUpUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
