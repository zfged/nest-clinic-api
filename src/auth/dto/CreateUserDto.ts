import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  @IsNotEmpty()
  roles: string[];
}