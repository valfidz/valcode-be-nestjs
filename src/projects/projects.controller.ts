import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project as ProjectModel } from '@prisma/client';
import { Public } from '@/auth/public';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get('project/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectModel | null> {
    return this.projectsService.getOneProject({ id: id});
  }

  @Public()
  @Get('all')
  async getAllProjects(): Promise<ProjectModel[]> {
    return this.projectsService.getAllProjects({
      where: { published: true }
    });
  }

  @Public()
  @Get('filtered-projects/:searchString')
  async getFilteredProjects(
    @Param('searchString') searchString: string,
  ): Promise<ProjectModel[]> {
    return this.projectsService.getAllProjects({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
          {
            content: { contains: searchString },
          }
        ],
      },
    });
  }

  @Post('project')
  async createProject(
    @Body() projectData: { title: string; description: string; content: string; stacks: string[]; authorEmail: string },
  ): Promise<ProjectModel> {
    const { title, description, content, stacks, authorEmail } = projectData;

    return this.projectsService.createProject({
      title,
      description,
      content,
      stacks,
      author: {
        connect: { email: authorEmail }
      }
    });
  }

  @Put('publish/:id')
  async publishProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectsService.updateProject({
      where: { id: id },
      data: { published: true },
    });
  }

  @Delete('project/:id')
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectsService.deleteProject({ id: id });
  }
  
}
