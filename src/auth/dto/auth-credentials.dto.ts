import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthCredentialsDto {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  token: string;
}
