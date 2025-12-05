import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreatePackImagenDto } from "./dto/create-pack-imagen.dto";
import { UpdatePackImagenDto } from "./dto/update-pack-imagen.dto";
import { PackImagenService } from "./pack-imagen.service";

@Controller("pack-imagen")
export class PackImagenController {
    constructor(private readonly service: PackImagenService) { }

    @Post()
    create(@Body() dto: CreatePackImagenDto) {
        return this.service.create(dto);
    }

    @Get(":id_pack")
    findImages(@Param("id_pack") id_pack: number) {
        return this.service.findByPack(id_pack);
    }

    @Patch(":id_imagen")
    update(
        @Param("id_imagen") id_imagen: number,
        @Body() dto: UpdatePackImagenDto
    ) {
        return this.service.update(id_imagen, dto);
    }

    @Delete(":id_imagen")
    remove(@Param("id_imagen") id_imagen: number) {
        return this.service.remove(id_imagen);
    }
}