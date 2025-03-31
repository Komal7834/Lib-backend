import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { CreateBookDto } from './books.dto';
import {  ViewBookDto } from './vbook.dto';
import { UpdateBookDto } from './updateBook.dto';

@Injectable()
export class BooksService {
 
 
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async addbooks(bookDat: CreateBookDto): Promise<BookEntity> {
    try {
      // Required fields check
      if (!bookDat.subject) {
        throw new Error("❌ Error: 'subject' field is required!");
      }
       
      const newBook = this.bookRepository.create( bookDat); // ✅ Convert DTO to Entity
      return this.bookRepository.save(newBook);  // ✅ Then save
      
    } catch (error) {
      throw new Error('❌ Failed to add book. Please check your input data.');
    }
  }
   async findAll(): Promise<BookEntity[]> {
      return this.bookRepository.find();
    }

    async findOne(id: number): Promise<BookEntity | null> {
      return this.bookRepository.findOne({ where: { id } });
    }
       
    async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
      const book = await this.bookRepository.findOne({ where: { id } });
      if (!book) {
        throw new Error(`❌ Book with ID ${id} not found!`);
      }
      
      Object.assign(book, updateBookDto);
      return this.bookRepository.save(book);
    }

    async delete(id: number): Promise<string> {
      const result = await this.bookRepository.delete(id);
     
      return `✅ Book with ID ${id} has been deleted successfully!`;
    }
  }
