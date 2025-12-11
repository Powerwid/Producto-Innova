import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Discount } from "./discount.entity";

@Entity({ name: "discount_type" })
export class DiscountType {
    @PrimaryGeneratedColumn()
    id_discount_type: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 255, nullable: true })
    descripcion?: string;

    @OneToMany(() => Discount, (discount) => discount.tipo)
    descuentos: Discount[];
}