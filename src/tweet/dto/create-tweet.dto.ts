import { IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto{
    
    @IsString()
    @IsNotEmpty()
    text:string;

    @IsOptional()
    image?:string;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsOptional()
    @IsInt({each: true})
    @IsArray()
    hashtags?:number[];
}