import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import authConfig from "../config/auth.config";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
@Injectable()
export class AuthorizeGuard implements CanActivate{
    
    constructor(
        private readonly jwtService: JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        private readonly reflector: Reflector
    ){}
   async canActivate(context: ExecutionContext): Promise<boolean>  {

        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ])


        if(isPublic){
            return true
        }
        //EXECUTE Request from  ExecutionContext
            const request: Request = context.switchToHttp().getRequest()
        // EXTRACT Token from the request header

        const token = request.headers.authorization?.split(" ")[1]
        //Validate the token and provide access/deny access
        console.log(token)

        if(!token){
            throw new UnauthorizedException()
        }

        
        try{
            const payload = await this.jwtService.verifyAsync(token, this.authConfiguration)

            request['user'] = payload
        } catch(error){
            throw new UnauthorizedException()
        }
        return true;
    }

}