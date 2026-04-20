import { ResponseInterface } from './response.interface';

export type LoginUserData = {
  access_token: string;
};

export type LoginResponseDto = ResponseInterface<LoginUserData>;
