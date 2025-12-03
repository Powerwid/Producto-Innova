import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    });

    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({ where: { id_user: id}});
  }

  async findByemail(email: string) {
    return this.usuarioRepository.findOne({ where: { email }});
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_user: id}});

    if (!usuario) return null;

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(usuario, dto);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}