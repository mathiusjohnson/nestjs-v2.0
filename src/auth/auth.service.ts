import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const logger = new Logger();

    logger.log(`user sign up hit in service`);
    return this.usersService.create(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const { username, password } = authCredentialsDto;
    const id = 'test';
    const user = await this.usersService.findOne(id);
    const logger = new Logger();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const token: string = await this.jwtService.sign(payload);
      logger.log(`user access token: ${token}`);
      return { token };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
