import { CreatePostInput } from './create-post.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field()
  id: string;

  @Field()
  text_body: string;
}
