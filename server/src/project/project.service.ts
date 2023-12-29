import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaConnectionService } from 'src/prisma_connection/prisma_connection.service';
import { startWith } from 'rxjs';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaConnectionService) {}
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  findAll() {
    return this.prisma.project.findMany({ take: 10 });
  }

  findOne(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  getProjectTasks(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }
}
