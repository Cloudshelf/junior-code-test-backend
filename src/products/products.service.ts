import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination.args';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPage } from './productPage.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findOneById(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async findAll(paginationArgs: PaginationArgs): Promise<ProductPage> {
    const [results, total] = await this.productRepository.findAndCount({
      order: { name: 'DESC' },
      take: paginationArgs.take,
      skip: 1,
    });

    return {
      nodes: results,
      totalRows: total,
    };
  }
}
