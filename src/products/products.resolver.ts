import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewProductInput } from './newProduct.input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductPage } from './productPage.model';
import { PaginationArgs } from '../common/pagination.args';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.findOneById(id);
    if (product) {
      throw new NotFoundException(id);
    }
    return product;
  }

  @Query(() => ProductPage)
  async products(@Args() paginationArgs: PaginationArgs): Promise<ProductPage> {
    return await this.productsService.findAll(paginationArgs);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('newProductData') newProductData: NewProductInput,
  ): Promise<Product> {
    const newProduct: Product = new Product();
    newProduct.name = newProductData.name;
    newProduct.description = newProductData.description;
    newProduct.price = newProductData.price;
    newProduct.images = newProductData.images[0];

    return await this.productsService.save(newProduct);
  }
}
