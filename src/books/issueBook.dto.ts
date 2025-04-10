import { IsString, IsNotEmpty } from 'class-validator';

export class IssueBookDto {
  @IsNotEmpty()
  bookNumber: string;

  @IsNotEmpty()
  issuedDate: string;

  @IsNotEmpty()
  @IsString()
  issuedToName: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;
}
