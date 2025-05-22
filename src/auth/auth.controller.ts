import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDTO){
    return this.authService.login(loginDto)
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDTO){
    return await this.authService.signUp(createUserDto)
  }
}
