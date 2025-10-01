import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Get(':userId')
  async getFavorites(@Param('userId', ParseIntPipe) userId: number) {
    return this.favoritesService.getFavorites(userId);
  }

  @Post('add')
  async addFavorite(@Body() body: { userId: number; movieId: number }) {
    return this.favoritesService.addFavorite(body.userId, body.movieId);
  }

  @Delete('remove')
  async removeFavorite(@Body() body: { userId: number; movieId: number }) {
    return this.favoritesService.removeFavorite(body.userId, body.movieId);
  }
}
