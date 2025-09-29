import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "name of the user",
    example: "John"
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "email of the user",
    example: "abc@gmail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "password of the user",
    example: "ABC123"
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "role of the user",
    example: "ADMIN"
  })
  @IsString()
  @IsNotEmpty()
  role:UserRole
}
