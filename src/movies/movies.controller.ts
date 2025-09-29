import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('Movies')
@ApiBearerAuth('JWT')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

 @Post('movies')
 create(@Body() dto: CreateMovieDto) {
   return this.moviesService.create(dto);
 }

  @Get('get-all-movies')
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateMovieDto) {
    return this.moviesService.update(+id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
