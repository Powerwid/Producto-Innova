import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductoImagen } from "../entities/producto-imagen.entity";
import { CreateProductoImagenDto } from "./dto/create-producto-imagen.dto";
import { UpdateProductoImagenDto } from "./dto/update-producto-imagen.dto"; 

@Injectable()
export class ProductoImagenService {
    constructor(
        @InjectRepository(ProductoImagen)
        private readonly repo: Repository<ProductoImagen>,
    ) {}

    create(dto: CreateProductoImagenDto) {
        const img = this.repo.create({
            ...dto,
            visible: true,
        });
        return this.repo.save(img);
    }

    findAllByProducto(id_producto: number) {
        return this.repo.find({
            where: { id_producto },
            order: { orden: 'ASC' },
        });
    }

    update(id_imagen: number, dto: UpdateProductoImagenDto) {
        return this.repo.update(id_imagen, dto);
    }

    async remove(id_imagen: number) {
        const result = await this.repo.delete(id_imagen);
        if (!result.affected) {
            throw new NotFoundException('Imagen no encontrada');
        }
        return { message: 'Imagen eliminada'};
    }

}