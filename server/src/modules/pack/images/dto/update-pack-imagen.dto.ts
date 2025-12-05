import { PartialType } from "@nestjs/mapped-types";
import { CreatePackImagenDto } from "./create-pack-imagen.dto";

export class UpdatePackImagenDto extends PartialType(CreatePackImagenDto) {}
