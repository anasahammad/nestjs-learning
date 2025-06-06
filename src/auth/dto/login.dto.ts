import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}