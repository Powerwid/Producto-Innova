import { PartialType } from "@nestjs/mapped-types";
import { CreatePackImagenDto } from "./create-pack-imagen.dto";
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator";

export class UpdatePackImagenDto extends PartialType(CreatePackImagenDto) {
    @IsOptional()
    @IsInt()
    @Min(1)
    orden?: number;

    @IsOptional()
    @IsBoolean()
    visible?: boolean;
}
