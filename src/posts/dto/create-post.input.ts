import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePostInput {
  @IsString()
  text_body: string;

  @IsString()
  poster_id: string;
}
