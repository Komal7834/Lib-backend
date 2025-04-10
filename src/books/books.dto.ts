import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: "❌ 'subject' field is required!" })
  subject: string;

  @IsNotEmpty({ message: "❌ 'bookNo' field is required!" })
  bookNo: number;

  @IsNotEmpty({ message: "❌ 'book' field is required!" })
  book: string;

  @IsNotEmpty({ message: "❌ 'author' field is required!" })
  author: string;

  @IsNotEmpty({ message: "❌ 'publisher' field is required!" })
  publisher: string;

  @IsNotEmpty({ message: "❌ 'quantity' field is required!" })
  quantity: number;

 
}
