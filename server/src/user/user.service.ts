import { Injectable } from '@nestjs/common';
import { PrismaConnectionService } from 'src/prisma_connection/prisma_connection.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaConnectionService) {}
}
