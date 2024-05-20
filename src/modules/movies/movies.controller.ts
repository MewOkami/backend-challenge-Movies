import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMovieDto: CreateMovieDto, @Request() req) {
    const userInfo = req.user.isAdm;

    if (userInfo === true) {
      return this.moviesService.create(createMovieDto);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Request() req,
  ) {
    const userInfo = req.user.isAdm;

    if (userInfo === true) {
      return this.moviesService.update(id, updateMovieDto);
    }

    throw new UnauthorizedException('You dont have permission');
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    const userInfo = req.user.isAdm;

    if (userInfo === true) {
      return this.moviesService.remove(id);
    }

    throw new UnauthorizedException('You dont have permission');
  }
}
