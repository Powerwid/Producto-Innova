import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Public()
  @Get(':order/:id_order')
  findByOrder(@Param('id_order') id_order: string) {
    return this.paymentService.findByOrder(+id_order);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Public()
  @Patch(':id/confirmar')
  confirmar(@Param('id') id: string) {
    return this.paymentService.confirmarPago(+id);
  }

  @Public()
  @Post(':id/falla')
  falla(@Param('id') id: string) {
    return this.paymentService.marcarFalla(+id);
  }

  @Public()
  @Patch(':id/reembolsar')
  reembolsar(@Param('id') id: string) {
    return this.paymentService.reembolsar(+id);
  }
}
