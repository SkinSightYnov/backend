//src/auth/auth.controller.ts

import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() { email, password }: LoginDto,
  ) {
    return this.authService.login(res, email, password);
  }

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Post('refresh')
  @ApiOkResponse({ type: AuthEntity })
  refresh(@Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(res);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
