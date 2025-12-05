import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany, } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

import { ProductoImagen } from './producto-imagen.entity';

@Entity({ name: 'producto' })
export class Producto {
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    id_categoria: number;

    @ManyToOne(() => Categoria, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'id_categoria' })
    categoria: Categoria;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 255, nullable: true })
    descripcion?: string;

    @Column('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        }
    })
    precio: number;

    @Column()
    stock: number;

    @Column({
        type: 'enum',
        enum: ['activo', 'inactivo', 'agotado'],
        default: 'activo',
    })
    estado: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    @OneToMany(() => ProductoImagen, (img) => img.producto)
    imagenes: ProductoImagen[];
}
