import { IsString, IsDateString } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly addition: string;

  @IsDateString()
  readonly createdAt: string;

  @IsDateString()
  readonly updatedAt: string;
}