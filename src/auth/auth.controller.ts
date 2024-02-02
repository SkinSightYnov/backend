//src/auth/auth.controller.ts

import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() { email, password }: LoginDto,
  ) {
    return this.authService.login(res, email, password);
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
