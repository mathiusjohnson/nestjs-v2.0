import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  textBody: string;

  @Field()
  @IsString()
  posterId: string;
}
