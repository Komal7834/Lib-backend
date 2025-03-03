import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
import { UserEntity } from './users.entity';
import { CreateUserDto } from './users.dto';
import { LoginUserDto } from './login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.signUp(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.userService.login(loginUserDto);
  }
  
  // Protected Route Example
  @Get('profile')   
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user;
  }

  
  @Get()
  async findAll(): Promise<{ message: string; data: UserEntity[] }> {
    const users = await this.userService.findAll();
    return { message: "this is your data", data: users };
  }

  }  

