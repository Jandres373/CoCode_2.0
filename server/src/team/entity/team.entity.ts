import { ApiProperty } from '@nestjs/swagger';
import {
  Team as PrismaTeam,
  TeamStatus as PrismaTeamStatus,
} from '@prisma/client';

export class TeamEntity implements PrismaTeam {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: PrismaTeamStatus;

  // Relations
  @ApiProperty()
  userId: number; // Asegúrate de que el tipo sea el mismo que en el modelo 'Team'

  @ApiProperty()
  leader: any; // Reemplaza 'any' con el tipo adecuado para 'User'

  @ApiProperty()
  members: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'User'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
