import {Body, Controller, Post, HttpCode, HttpStatus, Get, Res, Req} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignInDto } from "./dto/controllers/AuthController/sign-in.dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    showLogin(@Res() res: Response) {
        return res.render(
            './controllers/AuthController/auth-form',
            { pageTitle: 'Sign In' }
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Req() request: Request, @Body() signInDto: SignInDto, @Res() res: Response) {
        const [user, token] = await this.authService.signIn(signInDto.login, signInDto.password);

        //request.session.user = user;
        res.cookie('jwt', token, { httpOnly: true, secure: false });

        return res.send({ success: true });
    }
}