import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';
import { HastagModule } from './hastag/hastag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaginationModule } from './common/pagination/pagination.module';

import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import envValidator from './config/env.validation';
const ENV=process.env.NODE_ENV;

@Module({
  imports: [UsersModule, 
    TweetModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env': `.env.${ENV.trim()}`,
      load: [appConfig, databaseConfig],
      validationSchema:envValidator
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory : (configService: ConfigService)=> ({
      type: 'postgres',
      // entities: [User],
      autoLoadEntities: configService.get('database.autoLoadEntities'), // this will load all entities after making new entitiy
      synchronize: configService.get('database.synchronize'),
      host: configService.get('database.host'),
      port: +configService.get('database.port'),
      username: configService.get('database.userName'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
  
    })
  }), ProfileModule, HastagModule, AuthModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/* 
*typeOrmModule.forRoot is called synchronous actions to connect postgressql with typeorm using the typeorm options to make connect with database Asynchornous connection use forRootAsync and useFactory

*/