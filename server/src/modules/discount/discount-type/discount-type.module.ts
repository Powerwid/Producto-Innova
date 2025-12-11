import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountType } from "../entities/discount-type.entity";
import { DiscountTypeController } from "./discount-type.controller";
import { DiscountTypeService } from "./discount-type.service";

@Module({
    imports: [TypeOrmModule.forFeature([DiscountType])],
    controllers: [DiscountTypeController],
    providers: [DiscountTypeService],
    exports: [DiscountTypeService],
})
export class DiscountTypeModule {}