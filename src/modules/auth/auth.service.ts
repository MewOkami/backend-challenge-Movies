import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const passwordMatc = await compare(password, user.password);

    if (!passwordMatc) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    return {
      token: this.jwtService.sign(
        { email: email, isAdm: user.isAdm },
        { subject: user.id },
      ),
    };
  }
}
