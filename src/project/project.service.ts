import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(payload: { name: string }) {
    if (!payload.name) {
      throw new BadRequestException('Project name is required');
    }

    //existing project check
    const existingProject = await this.prisma.project.findFirst({
      where: { name: payload.name },
    });

    if (existingProject) {
      throw new ConflictException('Project with this name already exists');
    }

    const project = await this.prisma.project.create({
      data: {
        name: payload.name,
      },
    });

    return project;
  }
}
