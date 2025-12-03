export class CreateUsuarioDto {
    id_rol: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    telefono?: string;
    direccion: string;
}
