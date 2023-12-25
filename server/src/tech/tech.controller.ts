import { Controller } from '@nestjs/common';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}
}
