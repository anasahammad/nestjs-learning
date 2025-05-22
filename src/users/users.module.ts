import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/profile.entity";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import authConfig from "src/auth/config/auth.config";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthorizeGuard } from "src/auth/gurds/authorize.gurd";

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile]),
forwardRef(()=>AuthModule, // to avoid circular dependency

),
ConfigModule.forFeature(authConfig),
JwtModule.registerAsync(authConfig.asProvider()) 
],
    controllers: [UserController],
    providers: [UserService, 
        {
        provide: APP_GUARD,
        useClass: AuthorizeGuard
    } //this will use for module level guard use
],
    exports: [UserService]
})
export class UsersModule {}