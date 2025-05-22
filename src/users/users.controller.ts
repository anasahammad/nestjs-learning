import {  Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { GetUsersDto } from "./dtos/get-users.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";





@Controller('users')
export class UserController{
    constructor(private  userService: UserService){}

    @Get()
    getUsers(
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number, 
        @Query("page", new DefaultValuePipe(10), ParseIntPipe)  page: number,
        
    ){
        
        return this.userService.getUsers()
    }

    // @Get(':id')
    // getUserById(@Param('id', ParseIntPipe) id: number){
     
    //     return this.userService.getUserById(id)
    // }

    // @Post()
    // addUser(@Body() user: CreateUserDTO){
    //      return this.userService.createUser(user)
    // }

    // @Delete(':id')
    // deleteUser(@Param('id', ParseIntPipe) id: number){
        
    //      this.userService.deleteUser(id)
    //      return "deleted successfully"
    // }


    // @Patch()
    // updateUser(@Body() user: UpdateUserDto){
    //     console.log(user)
    //     return "user updated successfully"
    // }


    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.findUserById(id)
    }


    // @Get(':userName')
    // getUserByUserName(@Param('userName') userName: string){
    //     return this.userService.findUserByUserName(userName)

    // }

}