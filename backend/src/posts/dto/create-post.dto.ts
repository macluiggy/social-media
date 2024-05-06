import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// export class UserDto {
//   @ApiProperty({ example: 'john_doe' })
//   @IsNotEmpty()
//   @IsString()
//   @Length(0, 20)
//   username: string;

//   @ApiProperty({ example: 'John Doe' })
//   @IsNotEmpty()
//   @IsString()
//   fullName: string;

//   @ApiProperty({ example: 'john.doe@example.com' })
//   @IsNotEmpty()
//   @IsString()
//   @IsEmail()
//   email: string;

//   @ApiProperty({ example: 'password123' })
//   @IsNotEmpty()
//   @IsString()
//   @Length(8, 150)
//   password: string;

//   @ApiProperty({ example: true })
//   @IsNotEmpty()
//   @IsBoolean()
//   isPasswordReset: boolean;

//   @ApiProperty({ example: 'This is my signature' })
//   @IsOptional()
//   @IsString()
//   @Length(0, 255)
//   signature?: string;

//   @ApiProperty({ example: true })
//   @IsNotEmpty()
//   @IsBoolean()
//   isActive: boolean;

//   @ApiProperty({ example: 'admin' })
//   @IsNotEmpty()
//   @IsString()
//   role: string;

//   @ApiProperty({ example: '2022-01-01T00:00:00Z' })
//   @IsNotEmpty()
//   @IsDateString()
//   createdAt: Date;

//   @ApiProperty({ example: '2022-01-01T00:00:00Z' })
//   @IsOptional()
//   @IsDateString()
//   updatedAt?: Date;

//   @ApiProperty({ example: '2022-01-01T00:00:00Z' })
//   @IsOptional()
//   @IsDateString()
//   deletedAt?: Date;

//   @ApiProperty({ example: '1234567890' })
//   @IsOptional()
//   @IsString()
//   @Length(0, 20)
//   phone?: string;
// }

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
}
