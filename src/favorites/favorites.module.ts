import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';
import { Favourite } from './favorite.entity';  
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite, User, Movie])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})

export class FavoritesModule {}
