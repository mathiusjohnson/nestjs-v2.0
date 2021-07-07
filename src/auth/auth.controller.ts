import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const logger = new Logger('signup controller');

    logger.verbose(
      `user sign up hit with: ${JSON.stringify(authCredentialsDto)}`,
    );
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const logger = new Logger('sign in controller');

    logger.verbose(
      `user sign in hit with ${JSON.stringify(authCredentialsDto)}`,
    );
    return this.authService.signIn(authCredentialsDto);
  }
}
