/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { IssuedBookEntity } from './issued-book.entity';

@Entity('books')
@Unique(['bookNo'])  
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  bookNo: number;

  @Column()
  book : string;


  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  quantity: number;

@Column({ default: 0 })
issued: number;

@Column({ default: 0 })
availability: number;

@Column({ nullable: true, type: 'varchar' })
issuedToName: string;

@Column({ nullable: true, type: 'varchar' })
employeeId: string;


@OneToMany(() => IssuedBookEntity, issued => issued.book)
issuedBooks: IssuedBookEntity[];


}
