import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountProduct } from './entities/discount-product.entity';
import { DiscountType } from './entities/discount-type.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,

    @InjectRepository(DiscountProduct)
    private readonly dpRepo: Repository<DiscountProduct>,
  ) {}

  create(dto: CreateDiscountDto) {
    const discount = this.discountRepo.create(dto);
    return this.discountRepo.save(discount);
  }

  findAll() {
    return this.discountRepo.find({
      relations: ["tipo", "productos", "productos.producto"],
      order: { id_discount: "DESC" },
    });
  }
  async findOne(id: number) {
    const discount = await this.discountRepo.findOne({
      where: { id_discount: id },
      relations: ["tipo", "productos", "productos.producto"],
    });

    if (!discount) throw new NotFoundException("Descuento no encontrado");

    return discount;
  }

  async update(id: number, dto: UpdateDiscountDto) {
    const discount = await this.discountRepo.findOne({
      where: { id_discount: id },
    });

    if (!discount) throw new NotFoundException("Descuento no encontrado");

    Object.assign(discount, dto);
    return this.discountRepo.save(discount);
  }

  async remove(id: number) {
    const discount = await this.discountRepo.findOne({
      where: { id_discount: id },
    });

    if (!discount) throw new NotFoundException("Descuento no encontrado");

    return this.discountRepo.remove(discount);
  }

  async addProduct(id_discount: number, id_producto: number) {
    const discount = await this.discountRepo.findOne({ where: { id_discount } });
    if (!discount) throw new NotFoundException("Descuento no existe");

    const product = await this.dpRepo.manager.findOne("producto", {
      where: { id_producto },
    });
    if (!product) throw new NotFoundException("Producto no existe");

    const exists = await this.dpRepo.findOne({
      where: { id_discount, id_producto },
    });

    if (exists) return exists;

    const nuevo = this.dpRepo.create({ id_discount, id_producto });
    return this.dpRepo.save(nuevo);
  }


  async removeProduct(id_discount: number, id_producto: number) {
    const res = await this.dpRepo.delete({ id_discount, id_producto });

    if (res.affected === 0)
      throw new NotFoundException("Producto no asociado al descuento");
    return { message: "Producto retirado del descuento" }
  }
}

