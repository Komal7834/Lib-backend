// books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { CreateBookDto } from './books.dto';
import { UpdateBookDto } from './updateBook.dto';
import { IssuedBookEntity } from './issued-book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

    @InjectRepository(IssuedBookEntity)
    private issuedBookRepository: Repository<IssuedBookEntity>,
  ) {}

  async addbooks(bookDat: CreateBookDto): Promise<BookEntity> {
    if (!bookDat.subject) {
      throw new Error("❌ Error: 'subject' field is required!");
    }

    const newBook = this.bookRepository.create({
      ...bookDat,
      availability: bookDat.quantity,
    });

    return this.bookRepository.save(newBook);
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
      throw new NotFoundException(`❌ Book with ID ${id} not found!`);
    }

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async delete(id: number): Promise<string> {
    await this.bookRepository.delete(id);
    return `✅ Book with ID ${id} has been deleted successfully!`;
  }

  async issueBook(bookNo: number, issuedDate: string, issuedToName: string, employeeId: string) {
    const book = await this.bookRepository.findOne({ where: { bookNo } });
    if (!book) throw new Error(`❌ Book with Book No ${bookNo} not found`);
    if (book.availability <= 0) throw new Error(`❌ Book not available to issue`);

    book.issued = (book.issued || 0) + 1;
    book.availability = book.quantity - book.issued;
    await this.bookRepository.save(book);

    const issuedBook = this.issuedBookRepository.create({
      bookNo: book.bookNo,
      issuedToName,
      employeeId,
      issuedDate: new Date(issuedDate),
    });

    return this.issuedBookRepository.save(issuedBook);
  }

  async returnBook(issuedBookId: number): Promise<string> {
    const issuedRecord = await this.issuedBookRepository.findOne({
      where: { id: issuedBookId },
    });

    if (!issuedRecord) throw new Error(`❌ Issued record not found`);

    const book = await this.bookRepository.findOne({
      where: { bookNo: issuedRecord.bookNo },
    });

    if (!book) throw new Error(`❌ Book not found`);

    book.issued = Math.max(0, (book.issued || 1) - 1);
    book.availability = book.quantity - book.issued;

    await this.bookRepository.save(book);
    await this.issuedBookRepository.delete(issuedRecord.id);

    return `✅ Book returned successfully`;
  }

  async getIssuedBooks(): Promise<IssuedBookEntity[]> {
    return await this.issuedBookRepository.find({
      relations: ['book'],
      order: { issuedDate: 'DESC' },
    });
  }
}
