import { Controller, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectservice: ProjectService) {}

  @Post('create-project/:name')
  async createProject(@Param() name: string) {
    return this.projectservice.createProject({ name });
  }
}
