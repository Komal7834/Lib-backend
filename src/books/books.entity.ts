/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
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

}
