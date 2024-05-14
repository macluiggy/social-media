import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Hello, World!' })
  @IsNotEmpty({
    // message: 'Content is required',
  })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  userId: number;
}
