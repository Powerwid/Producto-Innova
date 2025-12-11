import { IsInt, Min } from "class-validator";

export class AddProductToDiscountDto {
  @IsInt()
  @Min(1)
  id_producto: number;
}
