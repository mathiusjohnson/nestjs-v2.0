import { IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  text_body: string;

  @IsString()
  poster_id: string;
}
