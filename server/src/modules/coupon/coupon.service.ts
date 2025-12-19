import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) { }

  async create(dto: CreateCouponDto) {
    if (!dto.porcentaje && !dto.monto_fijo) {
      throw new BadRequestException(
        'Debe especificar porcentaje o monto fijo'
      );
    }

    const exists = await this.couponRepo.findOne({
      where: { codigo: dto.codigo },
    });

    if (exists) {
      throw new BadRequestException('El codigo ya existe');
    }

    const coupon = this.couponRepo.create(dto);
    return this.couponRepo.save(coupon);
  }

  findAll() {
    return this.couponRepo.find({
      order: { id_coupon: 'DESC' },
    });
  }

  async findOne(id: number) {
    const coupon = await this.couponRepo.findOne({
      where: { id_coupon: id },
    });

    if (!coupon) {
      throw new NotFoundException('Cupon no encontrado')
    }

    return coupon;
  }

  async findByCode(codigo: string) {
    const coupon = await this.couponRepo.findOne({
      where: { codigo },
    });

    if (!coupon) {
      throw new NotFoundException('Cupón no encontrado');
    }

    if (coupon.estado !== 'activo') {
      throw new BadRequestException('Cupón no válido');
    }

    const now = new Date();

    if (coupon.fecha_inicio > now) {
      throw new BadRequestException('Cupón aún no disponible');
    }

    if (coupon.fecha_fin && coupon.fecha_fin < now) {
      throw new BadRequestException('Cupón expirado');
    }

    return coupon;
  }


  async update(id: number, dto: UpdateCouponDto) {
    const coupon = await this.findOne(id);

    Object.assign(coupon, dto);
    return this.couponRepo.save(coupon);
  }

  async remove(id: number) {
    const result = await this.couponRepo.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Cupon no encontrado');
    }

    return { message: 'Cupon eliminado correctamente' };
  }
}
