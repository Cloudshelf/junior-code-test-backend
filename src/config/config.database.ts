import * as Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfigSchema = {
  DATABASE_HOST: Joi.string().hostname(),
  DATABASE_PORT: Joi.number().port(),
  DATABASE_SCHEMA: Joi.string(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_ENTITY_DIR: Joi.string(),
};

@Injectable()
export class DatabaseConfigService {
  constructor(
    private readonly configService: ConfigService<typeof DatabaseConfigSchema>,
  ) {}

  get configuration(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      database: this.configService.get<string>('DATABASE_SCHEMA'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      entities: [this.configService.get<string>('DATABASE_ENTITY_DIR')],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    };
  }
}
