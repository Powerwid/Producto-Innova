import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pack } from "./pack.entity";
import { Producto } from "src/modules/producto/entities/producto.entity";

@Entity({ name:"pack_producto" })
export class PackProducto {
    @PrimaryColumn()
    id_pack: number;

    @PrimaryColumn()
    id_producto: number;

    @Column()
    cantidad: number;

    @ManyToOne(() => Pack, (pack) => pack.productos, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "id_pack"})
    pack: Pack;

    @ManyToOne(() => Producto, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name:"id_producto"})
    producto: Producto;
}