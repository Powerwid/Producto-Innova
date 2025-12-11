import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountType } from './entities/discount-type.entity';
import { DiscountProduct } from './entities/discount-product.entity';
import { DiscountTypeModule } from './discount-type/discount-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Discount,
      DiscountType,
      DiscountProduct,
    ]),
    DiscountTypeModule,
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
