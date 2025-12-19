import { Body, Controller, Get, Post } from "@nestjs/common";
import { DiscountTypeService } from "./discount-type.service";
import { CreateDiscountTypeDto } from "./dto/create-discount-type.dto";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller('discount/type')
export class DiscountTypeController {
    constructor(private readonly service: DiscountTypeService) {}

    @Roles(1, 2)
    @Post()
    create(@Body() dto: CreateDiscountTypeDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

}