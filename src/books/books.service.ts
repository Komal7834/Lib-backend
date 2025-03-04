import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { CreateBookDto } from './books.dto';
import {  ViewBookDto } from './vbook.dto';

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

      const newBook = this.bookRepository.create(bookDat);
      const savedBook = await this.bookRepository.save(newBook);
      return savedBook;
    } catch (error) {
      throw new Error('❌ Failed to add book. Please check your input data.');
    }
  }
   async findAll(): Promise<BookEntity[]> {
      return this.bookRepository.find();
    }

    async findOne(subject: string): Promise<BookEntity | null> {
      return this.bookRepository.findOne({ where: { subject } });
    }
  }
