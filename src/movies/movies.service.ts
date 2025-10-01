import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
 }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async findByGenre(genre: string): Promise<Movie[]> {
  return this.movieRepository.find({
    where: { genre },
  });
}

  async update(id: number, updateMovieDto: CreateMovieDto): Promise<Movie> {
    await this.movieRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
