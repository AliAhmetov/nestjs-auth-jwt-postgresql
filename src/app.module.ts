import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { TrelloColumn } from './columns/columns.model';
import { AuthModule } from './auth/auth.module';
import { Card } from './cards/cards.model';
import { APP_GUARD } from '@nestjs/core';
import ConfigModule from './config/config.module';
import { ConfigService } from './config/config.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        models: [User, TrelloColumn, Card],
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
