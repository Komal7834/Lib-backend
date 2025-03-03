import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { CreateBookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async addbooks(bookData: CreateBookDto): Promise<BookEntity> {
    try {
      console.log('📥 Received book data:', bookData); 

      // Required fields check
      if (!bookData.subject) {
        throw new Error("❌ Error: 'subject' field is required!");
      }

      const newBook = this.bookRepository.create(bookData);
      const savedBook = await this.bookRepository.save(newBook);

      console.log('✅ Book saved successfully:', savedBook);
      return savedBook;
    } catch (error) {
      console.error('🚨 Error while adding book:', error.message);
      throw new Error('❌ Failed to add book. Please check your input data.');
    }
  }
}
