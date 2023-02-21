import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: this.counterId,
      name: 'Iphone X',
      description: 'Mobile phone',
      price: 1199,
      image: '',
      stock: 25,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    const index = this.products.findIndex((item) => item.id === id);
    const updatedProduct = {
      ...product,
      ...payload,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    } else {
      this.products.splice(index, 1);
      return `Product ${index} deleted`;
    }
  }
}
