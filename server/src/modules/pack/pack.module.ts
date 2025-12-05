import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pack } from './entities/pack.entity';
import { PackImagen } from './entities/pack-imagen.entity';
import { PackProducto } from './entities/pack-producto.entity';
import { PackImagenController } from './images/pack-imagen.controller';
import { PackImagenService } from './images/pack-imagen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pack, PackImagen, PackProducto]),
  ],
  controllers: [PackController, PackImagenController],
  providers: [PackService, PackImagenService],
  exports: [
    PackService,
    PackImagenService
  ]
})
export class PackModule {}
