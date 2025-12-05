import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pack } from "./pack.entity";

@Entity({ name: "pack_imagen" })
export class PackImagen {
    @PrimaryGeneratedColumn()
    id_imagen: number;

    @Column()
    id_pack: number;

    @Column({ length: 500})
    url: string;

    @Column()
    orden: number;

    @ManyToOne(() => Pack, (pack) => pack.imagenes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'id_pack'})
    pack: Pack;

    @CreateDateColumn({ type: 'datetime' })
        created_at: Date;
    
    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}