import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  text_body: string;

  @Field()
  @IsString()
  poster_id: string;
}
