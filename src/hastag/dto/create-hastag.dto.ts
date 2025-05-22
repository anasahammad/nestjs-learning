import { IsNotEmpty, IsString } from "class-validator";

export class CreateHashTagDto{

    @IsString()
    @IsNotEmpty()
    name:string;
}