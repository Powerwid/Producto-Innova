import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PackImagen } from "./pack-imagen.entity";
import { PackProducto } from "./pack-producto.entity";

@Entity({ name: 'pack' })
export class Pack {
    @PrimaryGeneratedColumn()
    id_pack: number;

    @Column({ length: 100})
    nombre: string;

    @Column({ length: 255, nullable: true})
    descripcion: string;

    @Column('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        }
    })
    precio_final: number;

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

    @OneToMany(() => PackImagen, (img) => img.pack)
    imagenes: PackImagen[];

    @OneToMany(() => PackProducto, (pp) => pp.pack)
    productos: PackProducto[];
}
