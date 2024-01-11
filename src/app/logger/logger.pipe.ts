import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';

@Injectable()
export class LoggingPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const requestId = uuidv4();
    logger.log({
      level: 'info',
      message: `Request ${requestId} ${metadata.type} ${
        metadata.data
      } ${JSON.stringify(value)}`,
    });
    return value;
  }
}
