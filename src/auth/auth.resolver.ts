import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from 'src/users/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User, { name: 'signUp' })
  signup(@Args('input') authCredentialsDto: AuthCredentialsDto) {
    const logger = new Logger('signup controller');

    logger.verbose(
      `user sign up hit with: ${JSON.stringify(authCredentialsDto)}`,
    );
    return this.authService.signUp(authCredentialsDto);
  }
  @Mutation((returns) => User, { name: 'login' })
  login(@Args('input') authCredentialsDto: AuthCredentialsDto) {
    const logger = new Logger('sign in controller');

    logger.verbose(
      `user sign in hit with ${JSON.stringify(authCredentialsDto)}`,
    );
    return this.authService.signIn(authCredentialsDto);
  }
}
