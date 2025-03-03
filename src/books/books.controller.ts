import { Body, Controller, Post, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';
import { BookEntity } from './books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('addbooks')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async addbooks(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    try {
      console.log('📥 Incoming Book Data:', createBookDto); 

      const newBook = await this.booksService.addbooks(createBookDto);

      console.log('✅ Book added successfully:', newBook);
      return newBook;
    } catch (error) {
      console.error('🚨 Error while adding book:', error.message);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || '❌ Failed to add book',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
