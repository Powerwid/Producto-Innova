import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto} from "./dto/login.dto"
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usuarioService.findByemail(dto.email);

    if (!user) {
      throw new UnauthorizedException("Correo no registrado");
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException("Contraseña incorrecta");
    }

    const payload = { 
      sub: user.id_user,
      email: user.email,
      rol: user.id_rol, 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}