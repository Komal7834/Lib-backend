import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role, { message: 'Role must be either admin or librarian' })
  role: Role;
}
