import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    id_rol: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100})
    lastname: string;

    @Column({ length: 255, unique: true})
    email: string;

    @Column({ length: 255})
    password: string;

    @Column({ length: 50, nullable: true})
    telefono: string;

    @Column({ length: 255 })
    direccion: string;

    @Column({ type: 'enum', enum: ['activo', 'inactivo', 'suspendido'], default: 'activo'})
    estado: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated_at: Date;
}
