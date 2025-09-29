import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Movie } from 'src/movies/movie.entity';

@Entity('favorites')
export class Favourite {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  movieId: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.favoritedBy, { onDelete: 'CASCADE' })
  movie: Movie;
}
