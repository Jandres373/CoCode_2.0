import { ApiProperty } from '@nestjs/swagger';
import {
  Task as PrismaTask,
  TaskStatus as PrismaTaskStatus,
} from '@prisma/client';

export class TaskEntity implements PrismaTask {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  queryId: number | null;

  @ApiProperty()
  status: PrismaTaskStatus;

  @ApiProperty()
  expiration: Date;

  // Relations
  @ApiProperty()
  Project: any; // Reemplaza 'any' con el tipo adecuado para 'Project'

  @ApiProperty()
  asignees: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'User'

  @ApiProperty()
  Comment: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Comment'

  @ApiProperty()
  Query: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Query'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
