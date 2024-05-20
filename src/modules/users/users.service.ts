import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { STATUS_CODES } from 'http';
import { Http2ServerResponse } from 'http2';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    const findNick = await this.prisma.user.findFirst({
      where: { nickname: createUserDto.nickname },
    });

    if (findUser) {
      throw new ConflictException('User already exists');
    } else if (findNick) {
      throw new ConflictException('This Nickname already exists');
    }

    const user = new User();

    Object.assign(user, {
      ...createUserDto,
    });

    await this.prisma.user.create({
      data: { ...user },
    });

    return plainToInstance(User, user);
  }

  async findAll(userInfoId: string, userInfo: boolean) {
    const finduser = await this.prisma.user.findMany();

    if (userInfo === true) {
      return plainToInstance(User, finduser);
    } else {
      const result = [];

      finduser.forEach((findIds) => {
        if (findIds.id == userInfoId) {
          result.push(findIds);
        }
      });

      return plainToInstance(User, result);
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    return plainToInstance(User, user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    userInfoId: string,
    userInfo: boolean,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    const updateUser = this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    if (userInfo === true) {
      return plainToInstance(User, updateUser);
    }

    if (user.id != userInfoId) {
      throw new UnauthorizedException('You dont have permission');
    }

    return plainToInstance(User, updateUser);
  }

  async remove(id: string, userInfoId: string, userInfo: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (userInfo === true) {
      await this.prisma.user.delete({ where: { id } });
      return (response.statusCode = 200);
    }

    if (user.id != userInfoId) {
      throw new UnauthorizedException('You dont have permission');
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    const findEmail = await this.prisma.user.findFirst({
      where: { email },
    });

    return findEmail;
  }
}
