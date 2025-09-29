import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { Favourite } from 'src/favorites/favorite.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  description: string;

  @IsString()
  @Column()
  posterUrl: string;

  @IsString()
  @Column()
  genre?: string;

  @IsInt()
  @Column()
  releaseYear: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Favourite, (fav) => fav.movie)
  favoritedBy: Favourite[];
}
