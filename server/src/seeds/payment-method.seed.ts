import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PaymentMethodSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    const paymentMethods = [
      { nombre: 'Tarjeta de crédito', descripcion: 'Uso de tarjeta de crédito' },
      { nombre: 'Tarjeta de débito', descripcion: 'Uso de tarjeta de débito' },
      { nombre: 'Transferencia', descripcion: 'Transferencia bancaria directa' },
      { nombre: 'Yape', descripcion: 'Pago mediante Yape' },
      { nombre: 'Plin', descripcion: 'Pago mediante Plin' },
    ];

    for (const method of paymentMethods) {
      const exists = await this.dataSource.query(
        `SELECT 1 FROM payment_method WHERE nombre = ? LIMIT 1`,
        [method.nombre],
      );

      if (exists.length === 0) {
        await this.dataSource.query(
          `
          INSERT INTO payment_method (nombre, descripcion, estado)
          VALUES (?, ?, 'activo')
          `,
          [method.nombre, method.descripcion],
        );
      }
    }

    console.log('Métodos de pago seedeados correctamente');
  }
}
