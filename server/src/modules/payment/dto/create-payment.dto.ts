import { Type } from "class-transformer";
import { IsInt, IsNumber, IsPositive, Min } from "class-validator";

export class CreatePaymentDto {

    @IsInt({ message: 'id_order debe ser un entero' })
    @IsPositive({ message: 'id_order debe ser mayor 0' })
    @Type(() => Number)
    id_order: number;

    @IsInt()
    @IsPositive({ message: 'id_payment_method debe ser mayor a 0' })
    @Type(() => Number)
    id_payment_method: number;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'monto_pagado debe tener máximo 2 decimales' },
    )
    @Min(0.01, { message: 'monto_pagado debe ser mayor a 0' })
    @Type(() => Number)
    monto_pagado: number;
}
