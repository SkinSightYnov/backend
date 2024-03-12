import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as xss from 'xss';

@Injectable()
export class SanitizerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      this.sanitizeData(request.body);
    }

    return true;
  }

  private sanitizeData(data: Record<string, any>): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'string') {
          data[key] = xss.filterXSS(data[key]);
        } else if (typeof data[key] === 'object') {
          this.sanitizeData(data[key]);
        }
      }
    }
  }
}
