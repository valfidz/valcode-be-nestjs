import { Config } from 'nest-zod-config';
import { z } from 'zod';

const appConfigSchema = z.object({
  PORT: z.number(),
  DB_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

export class AppConfig extends Config(appConfigSchema) {}