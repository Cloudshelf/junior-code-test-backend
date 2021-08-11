import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configSchema } from './config.schema';

import { DatabaseConfigService } from './config.database';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: configSchema,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class ConfigModule {}
