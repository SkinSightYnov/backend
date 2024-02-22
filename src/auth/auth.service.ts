//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    res: Response,
    email: string,
    password: string,
  ): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await this.createAccessToken(user.id, user.role);
    const refreshToken = await this.createRefreshToken(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
    });

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: accessToken,
    };
  }

  async refresh(res: Response): Promise<AuthEntity> {
    const token = res.cookie['refreshToken'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const payload = this.jwtService.verify(token);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new NotFoundException(`No user found for id: ${payload.userId}`);
    }

    const refreshToken = await this.createRefreshToken(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
    });

    const accessToken = await this.createAccessToken(user.id, user.role);

    return {
      accessToken: accessToken,
    };
  }

  async createAccessToken(userId: string, role: Role) {
    return this.jwtService.sign(
      { userId: userId, role: role },
      { expiresIn: '1d' },
    );
  }

  async createRefreshToken(userId: string, role: Role) {
    const tokenId = uuid();
    return this.jwtService.sign(
      { userId: userId, tokenId: tokenId, role: role },
      { expiresIn: '7d' },
    );
  }

  // async validateUser(payload: any): Promise<any> {
  //   // Validate the user exists in your database, etc.
  //   return { id: payload.id };
  // }
}
