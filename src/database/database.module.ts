// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '@/users/entities/user.entity';
// import { AppConfig } from '@/app.config';
// import { ZodConfigModule, dotEnvLoader } from 'nest-zod-config';

// @Module({
//   imports: [
//     ZodConfigModule.forRootAsync({
//       config: AppConfig,
//       loader: [dotEnvLoader()],
//       isGlobal: true
//     }),
//     TypeOrmModule.forRootAsync({
//       inject: [AppConfig],
//       useFactory: (config: AppConfig) => ({
//         type: 'postgres',
//         url: config.DB_URL,
//         entities: [User],
//         synchronize: config.NODE_ENV !== 'production',
//       })
//     }),
//   ],
// })
// export class DatabaseModule {}