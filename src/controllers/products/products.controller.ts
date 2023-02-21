import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(
    @Query('price', ParseIntPipe) price: number,
    @Query('brand') brand: string,
  ) {
    const products = this.productsService.findAll();
    return {
      message: `List of products`,
      body: products,
    };
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    const newProduct = this.productsService.create(payload);
    return {
      message: 'Product created',
      body: newProduct,
    };
  }

  @Put(':id')
  update(@Body() payload: any, @Param('id', ParseIntPipe) id: number) {
    const updatedProduct = this.productsService.update(id, payload);
    if (updatedProduct) {
      return {
        message: `Product ${id} updated`,
        body: updatedProduct,
      };
    } else {
      return 'Product not found';
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const message = this.productsService.delete(id);
    return {
      message,
    };
  }
}
