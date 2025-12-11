import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateDiscountDto {
    @IsNumber()
    @IsNotEmpty()
    id_discount_type: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber()
    @Min(0.01)
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    monto_fijo?: number;

    @IsEnum(["activo", "inactivo", "expirado"])
    @IsOptional()
    estado?: string;

    @IsDateString()
    fecha_inicio: string;

    @IsDateString()
    @IsOptional()
    fecha_fin?: string;
}
