import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDTO } from './dto/login-auth.dto';
import { Users } from '../users/entities/users.entity';
import { Tokens } from 'src/tokens/entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Tokens)
    private readonly tokenRepository: Repository<Tokens>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginDTO) {
    const user = await this.validateUser(loginUserDto);
    const tokenInfo = await this.generateAccessToken(user);

    const userInfo = {
      ...user,
      accessToken: tokenInfo.accessToken,
      expiresIn: tokenInfo.expiresIn,
    };

    await this.saveUserToken(userInfo);
    return userInfo;
  }

  private async saveUserToken(info) {
    return this.tokenRepository.save({
      user_id: info?.id,
      token: info?.accessToken,
      expired_in: info?.expiresIn,
    });
  }

  async validateUser({ email, password }: LoginDTO) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new HttpException(
        'Password not corrected',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  private async generateAccessToken(user) {
    const accessToken = await this.jwtService.sign(
      { ...user },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return {
      accessToken,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }

  async validateToken(token: string) {
    const verifyToken = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return verifyToken;
  }

  async logout(user: any) {
    const tokenId = await this.tokenRepository.findOneBy({
      user_id: user.id,
    });

    if (!tokenId) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return this.tokenRepository.delete({ user_id: user.id });
  }
}
