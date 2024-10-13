import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from "../constants";
import {UsersService} from "../services/users.service";
import Handlebars from "handlebars";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);

        if (!token) {
            this.clearUser(request);
            throw new UnauthorizedException();
        }

        try {

            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            const user = await this.userService.findOne(payload.username);

            if (!user) {
                throw new UnauthorizedException();
            }

            request['user'] = user;

        } catch {
            this.clearUser(request);
            throw new UnauthorizedException();
        }

        return true;
    }

    private getToken(request: Request): string | undefined {
        console.log('getToken', request.cookies['jwt'] ?? undefined);
        return request.cookies['jwt'] ?? undefined;
    }

    private clearUser(request: Request) {
        request['user'] = undefined;
    }
}
