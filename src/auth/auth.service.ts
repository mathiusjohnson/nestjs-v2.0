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

  async signUp(username: string, password: string): Promise<User> {
    const logger = new Logger();
    console.log('in service: ', username, password);
    return this.usersService.create({ username, password });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; user: User }> {
    const { username, password } = authCredentialsDto;
    // const id = 'test';
    const user = await this.usersService.findUserSignIn(username);
    const logger = new Logger();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const token: string = await this.jwtService.sign(payload);
      logger.log(`user access token: ${token}`);
      return { token, user };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserSignIn(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
   * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
   * token created by signing the data.
   * @memberof AuthService
   */
  // createJwt(user: User): { data: JwtPayload; token: string } {
  //   const expiresIn = this.configService.jwtExpiresIn;
  //   let expiration: Date | undefined;
  //   if (expiresIn) {
  //     expiration = new Date();
  //     expiration.setTime(expiration.getTime() + expiresIn * 1000);
  //   }
  //   const data: JwtPayload = {
  //     username: user.username,
  //     expiration,
  //   };

  //   const jwt = this.jwtService.sign(data);

  //   return {
  //     data,
  //     token: jwt,
  //   };
  // }
}
