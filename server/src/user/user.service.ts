import { Injectable } from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { PrismaConnectionService } from 'src/prisma_connection/prisma_connection.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaConnectionService) {}

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
