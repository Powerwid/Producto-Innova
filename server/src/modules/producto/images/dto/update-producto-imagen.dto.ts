import { PartialType } from "@nestjs/mapped-types";
import { CreateProductoImagenDto } from "./create-producto-imagen.dto";
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator";

export class UpdateProductoImagenDto extends PartialType(CreateProductoImagenDto) {
    @IsOptional()
    @IsInt()
    @Min(1)
    orden?: number;

    @IsOptional()
    @IsBoolean()
    visible?: boolean;
}
