import { Controller, Post, Body, Get, UseGuards, Request, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
import { UserEntity } from './users.entity';
import { CreateUserDto } from './users.dto';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/role.decorator';
import { Role } from 'src/enum/role.enum';
import { LoginUserDto } from './login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  
  @Post('signup')
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return this.userService.signUp(createUserDto);
    }
    catch (error) {
    if (error instanceof ConflictException) {
      throw new ConflictException('this email is already exists.');
      
    } else if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else {
        console.error('Error creating :', error);
        throw new InternalServerErrorException('Error creating');
    }
  }
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string } > {
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
  

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }
  
  }  

