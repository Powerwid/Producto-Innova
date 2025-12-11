import { Injectable } from "@nestjs/common";
import { DiscountType } from "../entities/discount-type.entity";
import { Repository } from "typeorm";
import { CreateDiscountTypeDto } from "./dto/create-discount-type.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DiscountTypeService {
    constructor(
        @InjectRepository(DiscountType)
        private readonly repo: Repository<DiscountType>,
    ) {}

    create(dto: CreateDiscountTypeDto) {
        const tipo = this.repo.create(dto);
        return this.repo.save(tipo);
    }

    findAll() {
        return this.repo.find()
    }
}