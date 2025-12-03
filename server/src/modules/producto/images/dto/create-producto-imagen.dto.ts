import { IsIn, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductoImagenDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    id_producto: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    url: string;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    orden: number;
}