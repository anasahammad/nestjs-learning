import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { GetUsersDto } from "./dtos/get-users.dto";
import { Profile } from "src/profile/profile.entity";
import { ConfigService } from "@nestjs/config";
import { UserAlreadyExistException } from "src/CustomExceptions/user-already-exist.exception";
import { HashingProviderTs } from "src/auth/provider/hashing.provider";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
       private userRepository: Repository<User>,

        @InjectRepository(Profile)
       private profileRepository: Repository<Profile>,
    
      private readonly configService:ConfigService,
      @Inject(forwardRef(() => HashingProviderTs))
      private readonly hashingProvider: HashingProviderTs
    ){}

    
       getUsers(){
        let environment = this.configService.get('ENV_MODE')
        // let environment = process.env.NODE_ENV;
        console.log(environment)
        return this.userRepository.find({
            relations: 
            {profile: true}  /* its called eager loading. jodi one to one relation thake and oi child table er data o fetching er dorkar hoy tahole Eager loading use kora hoy eta hocche method:1 */ 
        })
       }

    public async createUser(userDto: CreateUserDTO){
       const isExist = await this.userRepository.findOne({
            where: [{email: userDto.email },{ userName: userDto.userName}]
        })

        if(isExist){
            throw new UserAlreadyExistException(`${isExist.email}`, `${isExist.userName}`)
        }

        // let newUser = this.userRepository.create(userDto)
        // newUser = await this.userRepository.save(newUser)
        // return newUser;

        //create profile and save profile

        // userDto.profile = userDto.profile ?? {}
        // let profile = this.profileRepository.create(userDto.profile)
        // await this.profileRepository.save(profile)
        

        //create user object
        let user = this.userRepository.create({
          ...userDto,
          password: await this.hashingProvider.hashedPassword(userDto.password),
        })
        // set the profile

        // user.profile = profile;

        // save the user

        return await this.userRepository.save(user)
    }

  public async deleteUser(id: number){
    await this.userRepository.delete(id)

    return {deleted: true}
  }
  public async findUserById(id: number){
   let user = await this.userRepository.findOneBy({id})

   if(!user){
    throw new HttpException({
      status:HttpStatus.NOT_FOUND,
      error: 'The user with Id ' + id + ' is not found',
      table: 'user'
    }, HttpStatus.NOT_FOUND, {
      description: `The excception occur becuase the user is not found in user table` // this is for developer debugging. It will not show in the client
    })
   }
  return user
  }


  public async findUserByUserName(userName: string){
    let user:User | null = null;

    try{
      user = await this.userRepository.findOneBy({userName})
    }catch(error){
      throw new RequestTimeoutException('The user with this username is not found', {
        description: `The excception occur becuase the user is not found in user table` // this is for developer debugging. It will not show in the client
      })
    }

    if(!user){
    throw new UnauthorizedException('The user with this username is not found')
    }
    
    return user
  }
}

