import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RolesSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    const roles = [
      { nombre: 'superadministrador' },
      { nombre: 'administrador' },
      { nombre: 'asesor' },
      { nombre: 'cliente' },
    ];

    for (const rol of roles) {
      const exists = await this.dataSource.query(
        "SELECT * FROM roles WHERE nombre = ?",
        [rol.nombre],
      );

      if (exists.length === 0) {
        await this.dataSource.query(
          "INSERT INTO roles (nombre) VALUES (?)",
          [rol.nombre],
        );
      }
    }

    console.log("Roles seedeados");
  }
}
