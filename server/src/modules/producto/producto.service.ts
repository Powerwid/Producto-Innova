import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  update(id: number, dto: UpdateProductoDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(dto: CreateProductoDto) {
    const producto = this.productoRepository.create(dto);
    return this.productoRepository.save(producto);
  }

  findAll() {
    return this.productoRepository.find({
      relations: ['categoria'],
      order: { id_producto: 'DESC' },
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['categoria'],
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    return producto;
  }

  async remove(id: number) {
    const res = await this.productoRepository.delete(id);

    if (res.affected === 0)
      throw new NotFoundException('Producto no encontrado');

    return { message: 'Producto eliminado correctamente' };
  }
}
