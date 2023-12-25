import { IsNotEmpty, IsString, IsBooleanString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBooleanString()
  rememberMe: boolean;
}
