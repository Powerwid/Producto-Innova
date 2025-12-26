import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
    
    @IsInt()
    @IsOptional()
    id_rol: number;
    
    @IsString()
    name: string;
    
    @IsString()
    lastname: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    telefono?: string;

}
