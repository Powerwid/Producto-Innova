import { Controller, Post, Body, Param, ParseIntPipe, Get, Patch, Delete } from "@nestjs/common";
import { ProductoImagenService } from './producto-imagen.service';
import { CreateProductoImagenDto } from './dto/create-producto-imagen.dto';
import { UpdateProductoImagenDto } from './dto/update-producto-imagen.dto';

@Controller('producto-imagen')
export class ProductoImagenController {
    constructor(private readonly service: ProductoImagenService) {}

    @Post()
    create(@Body() dto: CreateProductoImagenDto) {
        return this.service.create(dto);
    }

    @Get(':id_producto')
    findAllByProducto(@Param('id_producto', ParseIntPipe) id: number) {
        return this.service.findAllByProducto(id);
    }

    @Patch(':id_imagen')
    update(
        @Param('id_imagen', ParseIntPipe) id: number,
        @Body() dto: UpdateProductoImagenDto,
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id_imagen')
    remove(@Param('id_imagen', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}