import { Body, Controller, Post, Get, HttpException, HttpStatus, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';
import { BookEntity } from './books.entity';
import { ViewBookDto } from './vbook.dto';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('addbooks')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async addbooks(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    try { 
      const newBook = await this.booksService.addbooks(createBookDto);              
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
 
  @Get('findAll')
    async findAll(): Promise<{ message: string; data: BookEntity[] }> {
      const users = await this.booksService.findAll();
      return { message: "this is your data", data: users };
    }
    
    @Get(':subject')
    async findOne(@Param('subject') subject: string): Promise<{ message: string; data: BookEntity | null }> {
      const book = await this.booksService.findOne(subject);
      if (!book) {
        return { message: 'Book not found', data: null };
      }
      return { message: 'Book retrieved', data: book };
    }
}



