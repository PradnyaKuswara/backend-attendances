import { IsEmail, MaxLength } from 'class-validator';

export class FindUserByEmailDto {
  @IsEmail()
  @MaxLength(255)
  email: string;
}
