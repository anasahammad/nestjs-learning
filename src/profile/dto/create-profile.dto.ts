import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";



export class CreateProfileDto{
        @IsString({message: "First Name should be a string"})
        @MinLength(3, {message: "First Name must be 3 charecters"})
        @MaxLength(100)
        @IsOptional()
        firstName?: string;
    
        @IsString({message: "Last Name should be a string"})
        @MinLength(3, {message: "Last must be 3 charecters"})
        @MaxLength(100)
        @IsOptional()
        lastName?: string;
    
        @IsString()
        @MaxLength(10)
        @IsOptional()
        gender?: string;

        @IsDate()
        @IsOptional()
        dateOfBirth?: Date;

        @IsString()
        @IsOptional()
        bio?: string;


        @IsString()
        @IsOptional()
        profileImage?: string;
}