import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }



  //   http://localhost:3000/api/auth/signup
  //   method: POST
  //   {
  //     "firstName": "Akshay6",
  //     "lastName": "Chavhan6",
  //     "mobileNumber": "6666",
  //     "password": "Akshay@6"
  // }
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }


  
  //   http://localhost:3000/api/auth/login
  //   method: POST
  //   {
  //   "mobileNumber": "6666",
  //     "password": "Akshay@6"
  // }
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }


  // http://localhost:3000/api/auth/profile
  // method : -GET
  // Add bearing token
  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfileDetail(@Request() req): Promise<{ user: any }> {
    const userId = req.user.id;
    return this.authService.getProfileDetail(userId);
  }
}