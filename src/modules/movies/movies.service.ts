import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Movie } from './entities/movie.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const findMovie = await this.prisma.movie.findFirst({
      where: { name: createMovieDto.name },
    });

    if (findMovie) {
      throw new ConflictException('Movie already exists');
    }

    const movie = new Movie();

    Object.assign(movie, {
      ...createMovieDto,
    });

    await this.prisma.movie.create({
      data: { ...movie },
    });

    return plainToInstance(Movie, movie);
  }

  async findAll() {
    const findmovies = await this.prisma.movie.findMany();
    return findmovies;
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Not found');
    }

    return plainToInstance(Movie, movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Not found');
    }

    const updateMovie = this.prisma.movie.update({
      where: { id },
      data: { ...updateMovieDto },
    });

    return plainToInstance(Movie, updateMovie);
  }

  async remove(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Not found');
    }

    await this.prisma.movie.delete({ where: { id } });
  }
}
