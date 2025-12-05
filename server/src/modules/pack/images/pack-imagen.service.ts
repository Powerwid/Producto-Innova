import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PackImagen } from "../entities/pack-imagen.entity";
import { Repository } from "typeorm";
import { CreatePackImagenDto } from "./dto/create-pack-imagen.dto";
import { UpdatePackImagenDto } from "./dto/update-pack-imagen.dto";


@Injectable()
export class PackImagenService {
    constructor(
        @InjectRepository(PackImagen)
        private readonly repo: Repository<PackImagen>,
    ) {}

    create(dto: CreatePackImagenDto) {
        const img = this.repo.create(dto);
        return this.repo.save(img);
    }

    findByPack(id_pack: number) {
        return this.repo.find({
            where: { id_pack },
            order: { orden: "ASC" },
        });
    }

    async update(id_imagen: number, dto: UpdatePackImagenDto) {
        const img = await this.repo.findOne({ where: { id_imagen }});
        if (!img) throw new NotFoundException("Imagen no encontrada");

        Object.assign(img, dto);
        return this.repo.save(img);
    }

    async remove(id_imagen: number) {
        const img = await this.repo.findOne({ where: { id_imagen }});
        if (!img) throw new NotFoundException("Imagen no encontrada");

        return this.repo.remove(img);
    }
}