import { ApiProperty } from '@nestjs/swagger';
import {
  Report as PrismaReport,
  ReportType as PrismaReportType,
} from '@prisma/client';

export class ReportEntity implements PrismaReport {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  type: PrismaReportType;

  @ApiProperty()
  Comment: any[]; // Reemplaza 'any[]' con el tipo adecuado para 'Comment'

  @ApiProperty()
  reportId: number | null;

  // Relations
  @ApiProperty()
  Project: any | null; // Reemplaza 'any' con el tipo adecuado para 'Project'

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
