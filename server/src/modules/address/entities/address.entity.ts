import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_address')
export class Address {
    @PrimaryGeneratedColumn()
    id_address: number;

    @Column()
    id_user: number;

    @ManyToOne(() => Usuario, usuario => usuario.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_user' })
    usuario: Usuario;

    @Column({ length: 100, default: 'Peru' })
    pais: string;

    @Column({ length: 100, nullable: true })
    departamento: string;

    @Column({ length: 100, nullable: true })
    provincia: string;

    @Column({ length: 100, nullable: true })
    distrito: string;

    @Column({ length: 20, nullable: true })
    codigo_postal: string;

    @Column({ length: 100, nullable: true })
    nombre_contacto: string;

    @Column({ length: 100, nullable: true })
    apellido_contacto: string;

    @Column({ length: 50, nullable: true })
    telefono_contacto: string;

    @Column({ length: 255 })
    direccion_completa: string;

    @Column({ length: 255, nullable: true })
    referencia: string;

    @Column({ default: true })
    es_principal: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
}
