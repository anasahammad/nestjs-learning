import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/profile.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile]),
forwardRef(()=>AuthModule) // to avoid circular dependency
],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}