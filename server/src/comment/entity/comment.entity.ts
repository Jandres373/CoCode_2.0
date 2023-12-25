import { ApiProperty } from '@nestjs/swagger';
import { Comment as PrismaComment } from '@prisma/client';

export class CommentEntity implements PrismaComment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  text: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  taskId: number | null;

  @ApiProperty()
  queryId: number | null;

  @ApiProperty()
  reportId: number | null;

  @ApiProperty()
  parentId: number | null;

  @ApiProperty()
  parent: any | null; // Reemplaza 'any' con el tipo adecuado para 'Comment'

  // Relations to represent comment threads
  @ApiProperty()
  children: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Comment'

  @ApiProperty()
  Project: any; // Reemplaza 'any' con el tipo adecuado para 'Project'

  @ApiProperty()
  Task: any | null; // Reemplaza 'any' con el tipo adecuado para 'Task'

  @ApiProperty()
  Query: any | null; // Reemplaza 'any' con el tipo adecuado para 'Query'

  @ApiProperty()
  Report: any | null; // Reemplaza 'any' con el tipo adecuado para 'Report'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
