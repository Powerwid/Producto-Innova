import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoImagen } from './entities/producto-imagen.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { ProductoImagenService } from './images/producto-imagen.service'; 
import { ProductoImagenController } from './images/producto-imagen.controller'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, ProductoImagen])
  ],
  controllers: [ProductoController, ProductoImagenController],
  providers: [ProductoService, ProductoImagenService],
})
export class ProductoModule {}
