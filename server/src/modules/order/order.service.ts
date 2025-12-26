import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(userId: number, dto: CreateOrderDto) {

    const order = this.orderRepo.create({
      id_user: userId,
      id_address: dto.id_address,
      id_payment_method: dto.id_payment_method,
      id_coupon: dto.id_coupon,
      descuento_total: dto.descuento_total,
      total: dto.total,
      order_items_json: dto.order_items_json,
      estado: 'pendiente',
    });

    return this.orderRepo.save(order);
  }
}
