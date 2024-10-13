import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1200s' },
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}