import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { CreateBookDto } from './books.dto';
import { UpdateBookDto } from './updateBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,

  ) {}

  // Add a new book and initialize availability to quantity
  async addbooks(bookDat: CreateBookDto): Promise<BookEntity> {
    if (!bookDat.subject) {
      throw new Error("❌ Error: 'subject' field is required!");
    }

    const newBook = this.bookRepository.create({
      ...bookDat,
      availability: bookDat.quantity, // ✅ availability set to quantity
    });

    return this.bookRepository.save(newBook);
  }

  // Retrieve all books
  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  // Retrieve a book by ID
  async findOne(id: number): Promise<BookEntity | null> {
    return this.bookRepository.findOne({ where: { id } });
  }

  // Update an existing book
  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`❌ Book with ID ${id} not found!`);
    }

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  // Delete a book by ID
  async delete(id: number): Promise<string> {
    await this.bookRepository.delete(id);
    return `✅ Book with ID ${id} has been deleted successfully!`;
  }

  // Issue a book and update availability
 // 👇 Paste these methods in BooksService

async issueBook(bookNo: number, issuedDate: string) {
  const book = await this.bookRepository.findOne({ where: { bookNo } });

  if (!book) throw new Error(`❌ Book with Book No ${bookNo} not found`);
  if (book.availability <= 0) throw new Error(`❌ Book not available to issue`);

  book.issued = (book.issued || 0) + 1;
  book.availability = book.quantity - book.issued;

  return await this.bookRepository.save(book);
}

async returnBook(bookNo: number, returnDate: string) {
  const book = await this.bookRepository.findOne({ where: { bookNo } });

  if (!book) throw new Error(`❌ Book with Book No ${bookNo} not found`);
  if ((book.issued || 0) <= 0) throw new Error(`❌ No issued copies to return`);

  book.issued = book.issued - 1;
  book.availability = book.quantity - book.issued;

  return await this.bookRepository.save(book);
}


}