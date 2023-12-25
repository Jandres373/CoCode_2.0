import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserRoles as PrismaUserRoles } from '@prisma/client';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  rol: PrismaUserRoles;
}
