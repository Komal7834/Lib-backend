import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../enum/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()  // Ensures contactNumber is a string
  mobile: string;

  @IsString()
  city: string;

  @IsEnum(Role)
  role: Role;
}
