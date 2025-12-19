import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    id_payment_method: number;

    @IsOptional()
    @IsInt()
    id_coupon?: number;

    @IsNotEmpty()
    @IsObject()
    order_items_json: any;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsNumber()
    descuento_total: number;
}
