import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discount } from "./discount.entity";
import { Producto } from "src/modules/producto/entities/producto.entity";

@Entity({ name: "discount_product" })
export class DiscountProduct {
    @PrimaryColumn()
    id_discount: number;

    @PrimaryColumn()
    id_producto: number;

    @ManyToOne(() => Discount, (discount) => discount.productos, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "id_discount" })
    discount: Discount;

    @ManyToOne(() => Producto, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "id_producto" })
    producto: Producto;
}