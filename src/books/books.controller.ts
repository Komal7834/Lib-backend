// books.controller.ts
import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';
import { BookEntity } from './books.entity';
import { UpdateBookDto } from './updateBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuedBookEntity } from './issued-book.entity';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @InjectRepository(IssuedBookEntity)
    private readonly issuedBookRepository: Repository<IssuedBookEntity>,
  ) {}

  @Post('addbooks')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async addbooks(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    try {
      const newBook = await this.booksService.addbooks(createBookDto);
      return newBook;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || '❌ Failed to add book',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('issued-books')
  async getIssuedBooks(): Promise<IssuedBookEntity[]> {
    try {
      return await this.booksService.getIssuedBooks();
    } catch (error) {
      throw new HttpException('❌ Failed to fetch issued books', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('findAll')
  async findAll(): Promise<{ message: string; data: BookEntity[] }> {
    const books = await this.booksService.findAll();
    return { message: 'this is your data', data: books };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<{ message: string; data: BookEntity | null }> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      return { message: 'Book not found', data: null };
    }
    return { message: 'Book retrieved', data: book };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const msg = await this.booksService.delete(id);
    return { message: msg };
  }

  @Post('issue-book')
  async issueBook(
    @Body() body: {
      bookNumber: number;
      issuedDate: string;
      issuedToName: string;
      employeeId: string;
    },
  ) {
    const book = await this.booksService.issueBook(
      body.bookNumber,
      body.issuedDate,
      body.issuedToName,
      body.employeeId,
    );
    return { message: '✅ Book issued successfully!', book };
  }

  @Post('return-book')
  async returnBook(@Body() body: { issuedBookId: number }) {
    const message = await this.booksService.returnBook(body.issuedBookId);
    return { message };
  }
}
