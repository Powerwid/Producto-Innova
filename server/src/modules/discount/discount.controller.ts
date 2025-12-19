import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { AddProductToDiscountDto } from './dto/add-product.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('discount')
export class DiscountController {
  constructor(private readonly service: DiscountService) { }

  @Roles(1, 2)
  @Post()
  create(@Body() dto: CreateDiscountDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Roles(1, 2)
  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateDiscountDto) {
    return this.service.update(id, dto);
  }

  @Roles(1, 2)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }

  @Roles(1, 2)
  @Post(":id_discount/producto")
  addProduct(
    @Param("id_discount") id_discount: number,
    @Body() dto: AddProductToDiscountDto
  ) {
    return this.service.addProduct(id_discount, dto.id_producto);
  }

  @Roles(1, 2)
  @Delete(":id_discount/producto/:id_producto")
  removeProduct(
    @Param("id_discount") id_discount: number,
    @Param("id_producto") id_producto: number,
  ) {
    return this.service.removeProduct(id_discount, id_producto);
  }
}
