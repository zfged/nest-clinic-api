import { IsString, IsDateString } from 'class-validator';

export class UpdateCenterDto {
  readonly id: string;

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