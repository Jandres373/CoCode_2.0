import { ApiProperty } from '@nestjs/swagger';
import {
  Query as PrismaQuery,
  QueryStatus as PrismaQueryStatus,
  QueryType as PrismaQueryType,
} from '@prisma/client';

export class QueryEntity implements PrismaQuery {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  scheduledFor: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: PrismaQueryStatus;

  @ApiProperty()
  type: PrismaQueryType;

  @ApiProperty()
  taskId: number;

  @ApiProperty()
  createdBy: number;

  @ApiProperty()
  assignedTo: number;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  approvalDeadline: Date | null;

  // Relations to represent linked queries or actions
  @ApiProperty()
  Task: any; // Reemplaza 'any' con el tipo adecuado para 'Task'

  @ApiProperty()
  Comment: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Comment'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
