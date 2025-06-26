import { Config } from 'nest-zod-config';
import { z } from 'zod';

const appConfigSchema = z.object({
  DB_URL: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.number(),
});

export class AppConfig extends Config(appConfigSchema) {}