import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
    constructor(private readonly dataSource: DataSource) { }

    async run() {
        const email = 'admin@innova.com';

        const exists = await this.dataSource.query(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        );
        if (exists.length > 0) {
            console.log("Usuario ya existe");
            return;
        }

        const hashed = await bcrypt.hash('123456', 10);

        await this.dataSource.query(
            `INSERT INTO usuario 
            (id_rol, name, lastname, email, password, telefono, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                1,               // superadministrador (ID fijo)
                'Super',
                'Admin',
                email,
                hashed,
                '000000000',
                'Sistema'
            ]
        );
        console.log("Usuario creado correctamente")
    }
}