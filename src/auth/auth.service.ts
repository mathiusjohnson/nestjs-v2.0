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
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(username: string, password: string): Promise<User> {
    const logger = new Logger();
    console.log('in service: ', username, password);
    return this.usersService.create({ username, password });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; user: User; expiresIn: number }> {
    const { username, password } = authCredentialsDto;
    // const id = 'test';
    const user = await this.usersService.findUserSignIn(username);
    const logger = new Logger();

    if (user && (await bcrypt.compare(password, user.password))) {
      const expiresIn = 3600;
      const payload: JwtPayload = { username };
      const token: string = await this.createJwt(user!).token;
      logger.log(`user access token: ${token}`);

      return { token, user, expiresIn };
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
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof AuthService
   */
  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findUserSignIn(payload.username);

    // Ensure the user exists and their account isn't disabled
    if (user && user.enabled) {
      // user.lastSeenAt = new Date();
      // user.save();
      return user;
    }

    return undefined;
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
  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.jwtExpiresIn;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      username: user.username,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
