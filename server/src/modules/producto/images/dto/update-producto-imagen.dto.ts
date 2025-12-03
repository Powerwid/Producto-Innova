import { PartialType } from "@nestjs/mapped-types";
import { CreateProductoImagenDto } from "./create-producto-imagen.dto";

export class UpdateProductoImagenDto extends PartialType(CreateProductoImagenDto) {}
