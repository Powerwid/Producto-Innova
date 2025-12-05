import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackService } from './pack.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';

@Controller('pack')
export class PackController {
  constructor(private readonly service: PackService) {}

  @Post()
  create(@Body() dto: CreatePackDto) {
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

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdatePackDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }

  @Post(":id_pack/producto/:id_producto")
  addProducto(
    @Param("id_pack") id_pack: number,
    @Param("id_producto") id_producto: number,
    @Body("cantidad") cantidad: number,
  ) {
    return this.service.addProducto(id_pack, id_producto, cantidad);
  }
}
