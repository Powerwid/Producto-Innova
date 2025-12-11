import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDiscountTypeDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
