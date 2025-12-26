import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "./producto.entity";

@Entity({ name: 'producto_imagen'})
export class ProductoImagen {
    @PrimaryGeneratedColumn()
    id_imagen: number;

    @Column()
    id_producto: number;

    @ManyToOne(() => Producto, (producto) => producto.imagenes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

    @Column({ length: 500 })
    url: string;

    @Column()
    orden: number;

    @Column({ default: true })
    visible: boolean;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}