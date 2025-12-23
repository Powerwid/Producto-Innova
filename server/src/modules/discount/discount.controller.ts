import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { AddProductToDiscountDto } from './dto/add-product.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('discount')
export class DiscountController {
  constructor(private readonly service: DiscountService) { }

  @Public()
  @Post()
  create(@Body() dto: CreateDiscountDto) {
    return this.service.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Public()
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Public()
  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateDiscountDto) {
    return this.service.update(id, dto);
  }

  @Public()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }

  @Public()
  @Post(":id_discount/producto")
  addProduct(
    @Param("id_discount") id_discount: number,
    @Body() dto: AddProductToDiscountDto
  ) {
    return this.service.addProduct(id_discount, dto.id_producto);
  }

  @Public()
  @Delete(":id_discount/producto/:id_producto")
  removeProduct(
    @Param("id_discount") id_discount: number,
    @Param("id_producto") id_producto: number,
  ) {
    return this.service.removeProduct(id_discount, id_producto);
  }
}
