import { ResponseInterface } from './response.interface';
import { RoleInterface } from './role.interface';

export interface UserInterface {
  id: number;
  uuid: string;
  role_id: number;
  email: string;
  password: string;
  full_name?: string;
  position?: string;
  phone?: string;
  avatar?: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: RoleInterface;
}

export type UserResponseDataType = ResponseInterface<UserInterface>;

export type UserWithoutPasswordType = Omit<UserInterface, 'password'>;

export type UserWithoutPasswordResponseDataType =
  ResponseInterface<UserWithoutPasswordType>;
