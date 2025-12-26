import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(userId: number, dto: CreateAddressDto) {
    if (dto.es_principal) {
      await this.addressRepository.update(
        { id_user: userId, es_principal: true },
        { es_principal: false },
      );
    }

    const address = this.addressRepository.create({
      ...dto,
      id_user: userId,
    });

    return this.addressRepository.save(address);
  }

  async findByUser(userId: number) {
    return this.addressRepository.find({
      where: { id_user: userId },
      order: { es_principal: 'DESC', created_at: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    const address = await this.addressRepository.findOne({
      where: { id_address: id, id_user: userId },
    });

    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }

    return address;
  }

  async update(id: number, userId: number, dto: UpdateAddressDto) {
    const address = await this.findOne(id, userId);

    if (dto.es_principal) {
      await this.addressRepository.update(
        { id_user: userId, es_principal: true },
        { es_principal: false },
      );
    }

    Object.assign(address, dto);
    return this.addressRepository.save(address);
  }

  async remove(id: number, userId: number) {
    const address = await this.findOne(id, userId);
    return this.addressRepository.remove(address);
  }
}
