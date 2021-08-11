import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @Length(30, 255)
  description: string;

  @Field()
  price: number;

  @Field(() => [String])
  images: string[];
}
