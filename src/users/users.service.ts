import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './users.entity';
import { CreateUserDto } from './users.dto';
import { LoginUserDto } from './login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // SIGN UP
  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email,name, password, role, city, mobile } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role,
      city,
      mobile
    });

    return this.userRepository.save(newUser);
  }

  // LOGIN
  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, role: user.role };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken};
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // GET ALL USERS
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  // delete users
  async deleteUserByEmail(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    await this.userRepository.delete({ email });
    return { message: `User with email ${email} deleted successfully` };
  }
 
  
}
