import { IsDateString, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    readonly title: string;
  
    @IsString()
    readonly author: string;
  
    @IsDateString()
    readonly publishedDate: string;
  
    @IsDateString()
    readonly createdAt: string;
  
    @IsDateString()
    readonly updatedAt: string;
  }