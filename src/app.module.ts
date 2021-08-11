import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/config.database';
import { ConfigModule } from './config/config.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService) =>
        configService.configuration,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'src',
        'graphql',
        'generated',
        'schema.gql',
      ),
      sortSchema: true,
      context: ({ request }) => {
        return { req: request };
      },
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
