/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookEntity } from './books.entity';
import { IssuedBookEntity } from './issued-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, IssuedBookEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
