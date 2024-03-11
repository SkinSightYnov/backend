import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import xss from 'xss';

@Injectable()
export class SanitizerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      request.body = this.cleanData(request.body);
    }

    if (request.query) {
      request.query = this.cleanData(request.query);
    }

    if (request.params) {
      request.params = this.cleanData(request.params);
    }

    return true;
  }
  private cleanData(data: Record<string, any>): Record<string, any> {
    for (const key in data) {
      if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
        data[key] = xss(data[key]);
      }
    }

    return data;
  }
}
