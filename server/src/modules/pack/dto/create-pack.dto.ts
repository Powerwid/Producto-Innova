import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreatePackDto {
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
    precio_final: number;

    @IsEnum(["activo", "inactivo", "agotado"])
    @IsOptional()
    estado?: "activo" | "inactivo" | "agotado";
}
