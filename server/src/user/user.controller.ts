import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/user.decorator';

@UseGuards(new JwtGuard())
@Controller('users')
@ApiTags('Usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOkResponse({ type: UserEntity })
  getMe(@GetUser() user: User): User {
    return user;
  }
}
