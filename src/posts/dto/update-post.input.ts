import { CreatePostInput } from './create-post.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostInput extends PartialType(CreatePostInput) {
  id: string;
  text_body: string;
}
