import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DiscountType } from "./discount-type.entity";
import { DiscountProduct } from "./discount-product.entity";

@Entity({ name: "discount" })
export class Discount {
    @PrimaryGeneratedColumn()
    id_discount: number;

    @Column()
    id_discount_type: number;

    @ManyToOne(() => DiscountType, (dt) => dt.descuentos, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "id_discount_type" })
    tipo: DiscountType;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 255, nullable: true })
    descripcion?: string;

    @Column("decimal", { precision: 5, scale: 2, nullable: true })
    porcentaje: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    monto_fijo: number;

    @Column({
        type: "enum",
        enum: ["activo", "inactivo", "expirado"],
        default: "activo",
    })
    estado: string;

    @Column({ type: "datetime" })
    fecha_inicio: Date;

    @Column({ type: "datetime", nullable: true })
    fecha_fin?: Date;

    @CreateDateColumn({ type: "datetime" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime" })
    updated_at: Date;

    @OneToMany(() => DiscountProduct, (dp) => dp.discount)
    productos: DiscountProduct[];
}
