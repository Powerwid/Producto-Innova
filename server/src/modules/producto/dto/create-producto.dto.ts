import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, Min, IsInt, IsEnum } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion?: string;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(0)
    precio: number;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    stock: number;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @IsNotEmpty()
    id_categoria: number;

    @IsEnum(["activo", "inactivo", "agotado"])
    @IsOptional()
    estado?: "activo" | "inactivo" | "agotado";
}
