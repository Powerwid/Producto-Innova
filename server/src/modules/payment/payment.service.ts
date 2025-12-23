import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) { }

  async create(dto: CreatePaymentDto) {
    const payment = this.paymentRepo.create({
      id_order: dto.id_order,
      id_payment_method: dto.id_payment_method,
      monto_pagado: dto.monto_pagado,
      estado: 'pendiente',
    });

    return this.paymentRepo.save(payment);
  }

  async confirmarPago(id_payment: number) {
    const payment = await this.paymentRepo.findOneBy({ id_payment });

    if (!payment) {
      throw new Error('Pago no encontrado');
    }

    payment.estado = 'exitoso';
    payment.id_transaccion = `TX-${Date.now()}`;
    payment.payment_date = new Date();

    return this.paymentRepo.save(payment)
  }

  async marcarFalla(id_payment: number) {
    const payment = await this.paymentRepo.findOneBy({ id_payment });
    if (!payment) {
      throw new Error('Pago no encontrado');
    }
    payment.estado = 'falla';
    return this.paymentRepo.save(payment)
  }

  async findOne(id_payment: number) {
    return this.paymentRepo.findOneBy({ id_payment });
  }

  async findByOrder(id_order: number) {
    return this.paymentRepo.find({
      where: { id_order },
      order: { created_at: 'DESC'},
    });
  }

  async reembolsar(id_payment: number) {
    const payment = await this.paymentRepo.findOneBy({ id_payment });

    if(!payment) {
      throw new Error('Pago no encontrado');
    }

    payment.estado = 'reembolsado';
    return this.paymentRepo.save(payment);
  }
  
}
