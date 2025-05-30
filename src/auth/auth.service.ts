import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { HashingProviderTs } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { ActiveUserType } from 'src/interfaces/active-user-type.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        private readonly jwtService: JwtService,
        private readonly hashingProvider: HashingProviderTs
    ){}

    public async login(loginDto: LoginDTO){
        //first find the user by username or email
        let user = await this.userService.findUserByUserName(loginDto.userName)
        //then compare the password with the hashed password

        let isEqual: boolean = false;

        isEqual = await this.hashingProvider.comparePassword(loginDto.password, user.password)

        if(!isEqual){
            throw new UnauthorizedException("Password is incorrect")
        }
        
        //if the password is correct, return the user
        //if the password is incorrect, throw an error
        //if the user is not found, throw an error
        //if the user is found, return the user

        // const token = await this.jwtService.signAsync({
        //     sub: user.id,
        //     email: user.email,
        // },{
        //     secret: this.authConfiguration.secret,
        //     expiresIn: this.authConfiguration.expiresIn,
        //     audience: this.authConfiguration.audience,
        //     issuer: this.authConfiguration.issuer,
        // })
        // return {
        //     token: token,
        //     data: user,
        //     Succuess: true,
        //     message: "User logged in successfully",
        // };

        return this.generateToken(user)

    }

    public async signUp(createUserDto: CreateUserDTO){
        return await this.userService.createUser(createUserDto)
    }

    public async RefreshToken(refreshTokenDto: RefreshTokenDto){
       try {
         //1. Verify the refresh token
        const {sub} = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
            secret: this.authConfiguration.secret,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer,
        })
        //2.  find the user from db
        const user = await this.userService.findUserById(sub)
        //3. generate new access token

        return await this.generateToken(user)
       } catch (error) {
            throw new UnauthorizedException(error)
       }
    }

    private async signToken<T>(userId:number, expiresIn:number, payload?:T){
       return await this.jwtService.signAsync({
            sub: userId,
            ...payload,
        },{
            secret: this.authConfiguration.secret,
            expiresIn: expiresIn,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer,
        })
    }


    private async generateToken(user:User){
        //Generate Access Token
        const accessToken = await this.signToken<Partial<ActiveUserType>>(user.id, this.authConfiguration.expiresIn, {email:user.email})

        //Generate Refresh Token
        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshTokenExpiresIn)

        return {token: accessToken, refreshToken}
    }
}
