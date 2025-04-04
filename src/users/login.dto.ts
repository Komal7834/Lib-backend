import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/enum/role.enum';
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

 @IsEnum(Role)
   role: Role;
}
