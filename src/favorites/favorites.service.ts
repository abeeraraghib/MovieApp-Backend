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

  // Get all favorites for a specific user
  async getFavorites(userId: number): Promise<Favourite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });
  }

  // 🔹 Get all favorites across all users (for admin)
  async getAllFavorites(): Promise<Favourite[]> {
    return this.favoriteRepository.find({
      relations: ['user', 'movie'],
    });
  }

  // Add a favorite
  async addFavorite(userId: number, movieId: number): Promise<Favourite> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const movie = await this.movieRepository.findOneBy({ id: movieId });

    if (!user || !movie) {
      throw new Error('User or Movie not found');
    }

    const existing = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });
    if (existing) return existing;

    const favorite = this.favoriteRepository.create({ user, movie });
    return this.favoriteRepository.save(favorite);
  }

  // Remove a favorite
  async removeFavorite(userId: number, movieId: number) {
    const fav = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });
    if (!fav) return { message: 'Favorite not found' };

    await this.favoriteRepository.remove(fav);
    return { message: 'Favorite removed successfully' };
  }
}
