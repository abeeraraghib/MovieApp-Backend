import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './favorite.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favoriteRepository: Repository<Favourite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getFavorites(userId: number): Promise<Movie[]> {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });

    return favorites.map((fav) => fav.movie);
  }

  async getAllFavorites(): Promise<Favourite[]> {
    return this.favoriteRepository.find({
      relations: ['user', 'movie'],
    });
  }

  async addFavorite(userId: number, movieId: number): Promise<Favourite> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const movie = await this.movieRepository.findOneBy({ id: movieId });

    if (!user || !movie) {
      throw new Error('User or Movie not found');
    }

    const existing = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
      relations: ['user', 'movie'],
    });
    if (existing) return existing;

    const favorite = this.favoriteRepository.create({ user, movie });
    return this.favoriteRepository.save(favorite);
  }

  async removeFavorite(userId: number, movieId: number) {
    const fav = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
      relations: ['user', 'movie'],
    });

    if (!fav) return { message: 'Favorite not found' };

    await this.favoriteRepository.remove(fav);
    return { message: 'Favorite removed successfully' };
  }
}
