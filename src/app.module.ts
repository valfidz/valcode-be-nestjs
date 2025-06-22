import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { AppConfig } from './app.config';
import { ZodConfigModule, dotEnvLoader } from 'nest-zod-config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PostsModule,
    ProjectsModule,
    ZodConfigModule.forRootAsync({
      config: AppConfig,
      loader: [dotEnvLoader()],
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
