import { IsNotEmpty } from 'class-validator';

export class ViewBookDto {
  @IsNotEmpty({ message: "❌ 'subject' field is required!" })
  subject: string;

  @IsNotEmpty({ message: "❌ 'bookNo' field is required!" })
  bookNo: string;
}