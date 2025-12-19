import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateCouponDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    codigo: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion?: string;

    @IsNumber()
    @Min(0.01)
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @Min(0.01)
    @IsOptional()
    monto_fijo?: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    limite_uso?: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    limite_por_usuario?: number;

    @IsEnum(['activo', 'inactivo', 'expirado'])
    @IsOptional()
    estado?: 'activo' | 'inactivo' | 'expirado';

    @IsDateString()
    fecha_inicio: Date;

    @IsDateString()
    @IsOptional()
    fecha_fin?: Date;
}
