import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

import authConfig from './config/auth.config';
import { HashingProviderTs } from './provider/hashing.provider';
import { BycryptProviderTs } from './provider/bycrypt.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: HashingProviderTs,
    useClass: BycryptProviderTs
  }],
  imports: [forwardRef(() => UsersModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider())

  ],
  exports: [AuthService, HashingProviderTs]
})
export class AuthModule {}
