import { IsString, IsEmail, MinLength,MaxLength, IsEnum } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role, { message: 'Role must be either admin or librarian' })
  role: Role;
  
  @IsString()
  @MaxLength(10)
  mobile: string;

  @IsString()
  city: string;
}
