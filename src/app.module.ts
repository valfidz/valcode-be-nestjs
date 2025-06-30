import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { AppConfig } from './app.config';
import { ZodConfigModule, dotEnvLoader } from 'nest-zod-config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    // DatabaseModule,
    PostsModule,
    ProjectsModule,
    ZodConfigModule.forRootAsync({
      config: AppConfig,
      loader: [dotEnvLoader()],
      isGlobal: true
    }),
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
