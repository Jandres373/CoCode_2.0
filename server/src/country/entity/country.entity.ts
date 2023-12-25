import { ApiProperty } from '@nestjs/swagger';
import { Country as PrismaCountry } from '@prisma/client';

export class CountryEntity implements PrismaCountry {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  // Otras propiedades relacionadas que puedan existir en tu modelo
}
