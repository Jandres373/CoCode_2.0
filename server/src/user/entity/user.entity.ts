import { ApiProperty } from '@nestjs/swagger';
import {
  User as PrismaUser,
  UserRoles as PrismaUserRoles,
  UserTags as PrismaUserTags,
} from '@prisma/client';

export class UserEntity implements PrismaUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  hashedPassword: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  country: string | null;

  @ApiProperty()
  githubUser: string | null;

  @ApiProperty()
  ranking: number | null;

  @ApiProperty()
  points: number;

  @ApiProperty()
  tag: PrismaUserTags;

  @ApiProperty()
  rol: PrismaUserRoles;

  @ApiProperty()
  openToWork: boolean;

  // Propiedades adicionales que faltaban en la versión anterior
  @ApiProperty()
  projectsCreated: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Project'

  @ApiProperty()
  projectsCollaborated: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Project'

  @ApiProperty()
  leadingTeams: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Team'

  @ApiProperty()
  memberOfTeams: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Team'

  @ApiProperty()
  asignedToTasks: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Task'

  @ApiProperty()
  teamId: number | null; // Asegúrate de que el tipo sea el mismo que en el modelo 'User'
}
