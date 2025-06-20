import { Config } from 'nest-zod-config';
import { z } from 'zod';

const appConfigSchema = z.object({
  PORT: z.number(),
});

export class AppConfig extends Config(appConfigSchema) {}