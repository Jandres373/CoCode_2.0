import { Global, Module } from '@nestjs/common';
import { PrismaConnectionService } from './prisma_connection.service';

@Global()
@Module({
  providers: [PrismaConnectionService],
  exports: [PrismaConnectionService],
})
export class PrismaConnectionModule {}
