import { Body, Controller, Post, Get, HttpException, HttpStatus, UsePipes, ValidationPipe, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';
import { BookEntity } from './books.entity';
import { UpdateBookDto } from './updateBook.dto';
import { RolesGuard } from 'src/role.guard';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/role.decorator';



@Controller('books')

export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('addbooks')
  // @UseGuards(RolesGuard)
  // @Roles(Role.LIBRARIAN)
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
  // @UseGuards(RolesGuard)
  // @Roles(Role.LIBRARIAN)
    async findAll(): Promise<{ message: string; data: BookEntity[] }> {
      const users = await this.booksService.findAll();
      return { message: "this is your data", data: users };
    }
    
  @Get(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.LIBRARIAN)
  async findOne(@Param('id') id: number): Promise<{ message: string; data: BookEntity | null }> {
    const book = await this.booksService.findOne(id);
    
    if (!book) {  console.log(book);
      return { message: 'Book not found', data: null };
    }
    
    return { message: 'Book retrieved', data: book };
    
  }

  @Put(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.LIBRARIAN)
  async update(@Param('id') id: string, @Body() updatebookDto: UpdateBookDto ) {
    return this.booksService.update(+id, updatebookDto)
  }

  @Delete(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.LIBRARIAN)
  async delete(@Param('id') id: number): Promise<{ message: string;}> {
    const book = await this.booksService.delete(id);
    
    if (!book) {  console.log(book);
      return { message: 'Book not found' };
    }
    
    return { message: 'Book deleted' };
    
  }
   
}



