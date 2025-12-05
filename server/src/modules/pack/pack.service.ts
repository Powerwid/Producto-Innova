import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './entities/pack.entity';
import { Repository } from 'typeorm';
import { PackImagen } from './entities/pack-imagen.entity';
import { PackProducto } from './entities/pack-producto.entity';

@Injectable()
export class PackService {
  constructor(
    @InjectRepository(Pack)
    private readonly packRepo: Repository<Pack>,

    @InjectRepository(PackProducto)
    private readonly packProductoRepo: Repository<PackProducto>,
  ) {}

  async create(dto: CreatePackDto) {
    const pack = this.packRepo.create(dto);
    return await this.packRepo.save(pack);
  }

  findAll() {
    return this.packRepo.find({
      relations: ["imagenes", "productos", "productos.producto"],
      order: { id_pack: "DESC"},
    });
  }

  async findOne(id: number) {
    const pack = await this.packRepo.findOne({
      where: { id_pack: id },
      relations: ["imagenes", "productos", "productos.producto"],
    });

    if (!pack) throw new NotFoundException("Pack no encontrado");

    return pack;
  }

  async update(id: number, dto: UpdatePackDto) {
    const pack = await this.packRepo.findOne({ where: { id_pack: id }});
    if (!pack) throw new NotFoundException("Pack no encontrado");

    Object.assign(pack, dto);
    return this.packRepo.save(pack);
  }

  async remove(id: number) {
    const pack = await this.packRepo.findOne({ where: { id_pack: id }});
    if (!pack) throw new NotFoundException("Pack no encontrado");

    return this.packRepo.remove(pack);
  }

  async addProducto(id_pack: number, id_producto: number, cantidad: number) {
    const exists = await this.packProductoRepo.findOne({
      where: { id_pack, id_producto },
    });

    if (exists) {
      exists.cantidad += cantidad;
      return this.packProductoRepo.save(exists);
    }

    const nuevo = this.packProductoRepo.create({
      id_pack,
      id_producto,
      cantidad,
    });

    return this.packProductoRepo.save(nuevo);
  }

  async removeProducto(id_pack: number, id_producto: number) {
    const res = await this.packProductoRepo.delete({ id_pack, id_producto });

    if (res.affected === 0)
      throw new NotFoundException("Producto no existe en este pack");

    return { message: "Producto eliminado del pack" };
  }
}
