/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from 'src/enum/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
   
  @Column({ nullable: false }) // ✅ Ensure name is properly defined
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;
   
 
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.LIBRARIAN,

  })
  role: Role;
  
  @Column()
   city: string;
 
  
   @Column()
   mobile: string;
   
}
