/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleRpcError(error: any): never {
  if (error?.statusCode && error?.message) {
    throw new HttpException(error.message, error.statusCode);
  }

  throw new InternalServerErrorException(
    error?.message || 'Internal server error',
  );
}
