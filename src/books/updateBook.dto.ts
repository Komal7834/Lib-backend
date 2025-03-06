import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: "❌ 'subject' field is required!" })
  subject: string;

  @IsNotEmpty({ message: "❌ 'bookNo' field is required!" })
  bookNo: string;

  @IsNotEmpty({ message: "❌ 'author' field is required!" })
  author: string;

  @IsNotEmpty({ message: "❌ 'publisher' field is required!" })
  publisher: string;

  @IsNotEmpty({ message: "❌ 'quantity' field is required!" })
  quantity: number;
}
