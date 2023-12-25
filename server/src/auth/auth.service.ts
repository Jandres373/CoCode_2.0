import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaConnectionService } from 'src/prisma_connection/prisma_connection.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaConnectionService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // throw exeption if user doesn't exist
    if (!user)
      throw new ForbiddenException('Los datos ingresados son incorrectos');

    // compare password
    const userFound = await argon.verify(user.hashedPassword, dto.password);
    if (!userFound) throw new ForbiddenException('Contraseña incorrecta');

    // return user and the token
    return this.signInToken(user.id, user.email);
  }

  async register(dto: RegisterDto) {
    // hash the password
    const hashedPassword = await argon.hash(dto.password);

    // replace sent password with hashed password
    dto.password = hashedPassword;

    // Eliminar la propiedad password y crear la propiedad hashed_password
    const data = { ...dto, hashedPassword, password: undefined };

    // save user to db
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async signInToken(userId: number, email: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token };
  }
}
