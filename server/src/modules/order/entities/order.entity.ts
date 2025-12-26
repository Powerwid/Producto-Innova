import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'order' })
export class Order {

  @PrimaryGeneratedColumn({ name: 'id_order' })
  id_order: number;

  @Column()
  id_user: number;

  @Column()
  id_address: number;

  @Column()
  id_payment_method: number;

  @Column({ nullable: true })
  id_coupon?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  descuento_total: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'json' })
  order_items_json: any;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'pagado', 'cancelado', 'fallido'],
    default: 'pendiente',
  })
  estado: string;

  @Column({ type: 'datetime', nullable: true })
  payment_date: Date;

}
