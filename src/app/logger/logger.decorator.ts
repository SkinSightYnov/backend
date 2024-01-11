import { SetMetadata } from '@nestjs/common';

export const Logging = (message: string) => SetMetadata('message', message);
