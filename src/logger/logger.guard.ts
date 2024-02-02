// logger/logger.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import logger from './logger';

@Injectable()
export class LoggingGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const message = request.headers['message'];
    logger.log({ level: 'info', message });
    return true;
  }
}
