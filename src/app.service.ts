import { Injectable } from '@nestjs/common';
import { AppConfig } from './app.config';

@Injectable()
export class AppService {
  constructor(private config: AppConfig) {}

  getHello(): string {
    return `Hello World! Listening on port ${this.config.PORT}`;
  }
}
