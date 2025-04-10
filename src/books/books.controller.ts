import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';
import { BookEntity } from './books.entity';
import { UpdateBookDto } from './updateBook.dto';
import { RolesGuard } from 'src/role.guard';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/role.decorator';
import { IssuedBookEntity } from './issued-book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService,
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

  @Get('issued-books')
  async getIssuedBooks(): Promise<IssuedBookEntity[]> {
    try {
      return await this.issuedBookRepository.find({
        relations: ['book'],
        order: { id: 'DESC' },
      });
    } catch (error) {
      throw new HttpException(
        '❌ Failed to fetch issued books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('findAll')
  async findAll(): Promise<{ message: string; data: BookEntity[] }> {
    const users = await this.booksService.findAll();
    return { message: 'this is your data', data: users };
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
  async update(@Param('id') id: string, @Body() updatebookDto: UpdateBookDto) {
    return this.booksService.update(+id, updatebookDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const book = await this.booksService.delete(id);

    if (!book) {
      return { message: 'Book not found' };
    }

    return { message: 'Book deleted' };
  }

  @Post('issue-book')
  async issueBook(
    @Body() body: { bookNumber: number; issuedDate: string; issuedToName: string; employeeId: string }
  ) {
    const book = await this.booksService.issueBook(
      body.bookNumber,
      body.issuedDate,
      body.issuedToName,
      body.employeeId
    );
    return { message: '✅ Book issued successfully!', book };
  }

  @Post('return-book')
  async returnBook(@Body() body: { bookNumber: number; returnDate: string }) {
    const book = await this.booksService.returnBook(body.bookNumber);
    return { message: '📦 Book returned successfully!', book };
  }
}
