import { ApiProperty } from '@nestjs/swagger';
import { Tech as PrismaTech } from '@prisma/client';

export class TechEntity implements PrismaTech {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
