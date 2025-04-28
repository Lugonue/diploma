import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../modules/user/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user: User = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied. User not found or role not defined.');
    }

    const hasRole = () => user.role !== undefined && roles.includes(user.role);
    if (!hasRole()) {
      throw new ForbiddenException('Access denied. Insufficient role.');
    }
    return true;
  }
}
