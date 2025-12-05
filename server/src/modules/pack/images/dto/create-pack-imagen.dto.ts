import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePackImagenDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  id_pack: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  url: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  orden: number;
}
