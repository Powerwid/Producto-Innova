import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProductoModule } from './modules/producto/producto.module';
import { PackModule } from './modules/pack/pack.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { DiscountModule } from './modules/discount/discount.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'powerwid',
      database: 'tienda_innova',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuarioModule,
    CategoriaModule,
    ProductoModule,
    PackModule,
    PaymentModule,
    OrderModule,
    CouponModule,
    DiscountModule,
    AuthModule,
    ChatModule
  ],
})
export class AppModule {}
