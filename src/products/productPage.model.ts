import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
export class ProductPage {
  @Field()
  totalRows: number;

  @Field(() => [Product])
  nodes: Product[];
}
