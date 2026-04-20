import { RpcException } from '@nestjs/microservices';

type RpcErrorResponse = {
  statusCode: number;
  message: string;
  error?: string;
};

export function rpcError(
  message: string,
  status = 500,
  error?: string,
): RpcException {
  const payload: RpcErrorResponse = {
    statusCode: status,
    message,
  };

  if (error) {
    payload.error = error;
  }

  return new RpcException(payload);
}

export function rpcUnauthorized(message = 'Unauthorized'): RpcException {
  return rpcError(message, 401, 'Unauthorized');
}

export function rpcForbidden(message = 'Forbidden'): RpcException {
  return rpcError(message, 403, 'Forbidden');
}

export function rpcNotFound(message = 'Not found'): RpcException {
  return rpcError(message, 404, 'Not Found');
}

export function rpcBadRequest(message = 'Bad request'): RpcException {
  return rpcError(message, 400, 'Bad Request');
}

export function rpcConflict(message = 'Conflict'): RpcException {
  return rpcError(message, 409, 'Conflict');
}
