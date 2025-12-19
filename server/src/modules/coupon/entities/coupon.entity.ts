import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name:'coupon'})
export class Coupon {
    @PrimaryGeneratedColumn()
    id_coupon: number;

    @Column({ length: 50, unique: true})
    codigo: string;

    @Column({ length: 255, nullable: true})
    descripcion?: string;

    @Column('decimal', { precision: 5, scale: 2, nullable: true})
    porcentaje?: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true})
    monto_fijo?: number

    @Column({ type: 'int', nullable: true})
    limite_uso?: number;

    @Column({ type: 'int', nullable: true})
    limite_por_usuario?: number;

    @Column({ type:'enum', enum: ['activo', 'inactivo', 'expirado'], default: 'activo'})
    estado: 'activo' | 'inactivo' | 'expirado';

    @Column({ type:'datetime'})
    fecha_inicio: Date;

    @Column({ type: 'datetime', nullable: true})
    fecha_fin?: Date;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
