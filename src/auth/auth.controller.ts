import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AllowAnonymous } from './decorators/allow-anonymos.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
 
  constructor(private readonly authService: AuthService) {}

   @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDTO){
    return this.authService.login(loginDto)
  }

  @AllowAnonymous()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() createUserDto: CreateUserDTO){
    return await this.authService.signUp(createUserDto)
  }

  @AllowAnonymous() 
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto){
    return this.authService.RefreshToken(refreshTokenDto)
  }
}
