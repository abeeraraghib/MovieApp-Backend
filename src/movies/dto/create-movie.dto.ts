import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: "Movie title", example: "Superman" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Description of the movie", example: "A superhero action movie" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "action", example: 2025 })
  @IsString()
  genre: string;

  @ApiProperty({ description: "Poster URL", example: "http://example.com/poster.jpg" })
  @IsOptional()
  @IsString()
  posterUrl?: string;

  @ApiProperty({ description: "Release year", example: 2025 })
  @IsNumber()
  releaseYear: number;
  
}
