import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { RolesEnum } from "../enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        if (!user) throw new ForbiddenException('Token Invalido');
        
        if(!requiredRoles.includes(user.rol)) {
            throw new ForbiddenException('No Tienes permiso');
        }

        return true;
    }
}