import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn({ name: 'id_payment'})
    id_payment: number;

    @Column()
    id_order: number;

    @Column()
    id_payment_method: number;

    @Column('decimal', { precision: 10, scale: 2})
    monto_pagado: number;

    @Column({ length: 100, nullable: true})
    id_transaccion?: string;

    @Column({
        type: 'enum',
        enum: ['exitoso', 'pendiente', 'falla', 'reembolso'],
        default: 'pendiente',
    })
    estado: 'exitoso' | 'pendiente' | 'falla' | 'reembolsado';

    @Column({ type: 'datetime', nullable: true })
    payment_date?: Date;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
