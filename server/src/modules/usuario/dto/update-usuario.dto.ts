import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    id_rol?: number;
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;
    telefono?: string;
    direccion?: string;
}
