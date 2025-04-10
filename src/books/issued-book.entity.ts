// issued-book.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from '../books/books.entity';

@Entity('issued_books')
export class IssuedBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookNo: number;

  @Column({ type: 'timestamp', nullable: false })
  issuedDate: Date;

  @Column()
  issuedToName: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => BookEntity, (book) => book.issuedBooks, { eager: false })
  @JoinColumn({ name: 'bookNo', referencedColumnName: 'bookNo' })
  book: BookEntity;
}
