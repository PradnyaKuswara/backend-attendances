import { ResponseInterface } from '../interface/response.interface';

type SuccessResponseParams<T> = {
  data: T;
  message?: string;
  status?: number;
};

type ErrorResponseParams = {
  message: string;
  status?: number;
};

export function successResponse<T>({
  data,
  message = 'Success',
  status = 200,
}: SuccessResponseParams<T>): ResponseInterface<T> {
  return {
    statusCode: status,
    message,
    data,
  };
}

export function errorResponse({
  message,
  status = 500,
}: ErrorResponseParams): ResponseInterface<null> {
  return {
    statusCode: status,
    message,
    data: null,
  };
}
