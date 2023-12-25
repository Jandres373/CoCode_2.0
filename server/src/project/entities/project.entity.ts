import { ApiProperty } from '@nestjs/swagger';
import {
  Project as PrismaProject,
  ProjectCategory as PrismaProjectCategory,
} from '@prisma/client';

export class ProjectEntity implements PrismaProject {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  category: PrismaProjectCategory;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string | null;

  @ApiProperty()
  githubRepo: string | null;

  @ApiProperty()
  openToColaborations: boolean;

  // Relations
  @ApiProperty()
  owner: any; // Reemplaza 'any' con el tipo adecuado para 'User'

  @ApiProperty()
  collaborators: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'User'

  @ApiProperty()
  comments: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Comment'

  @ApiProperty()
  tasks: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Task'

  @ApiProperty()
  Report: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Report'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
