import {Controller, Get, Res, UseGuards, Request} from "@nestjs/common";
import {Response} from "express";
import {AuthGuard} from "./guards/auth.guard";

@Controller('profile')
export class ProfileController {

    @UseGuards(AuthGuard)
    @Get()
    showProfile(@Request() req, @Res() res: Response) {
        console.log(req.user);
        return res.render(
            './controllers/ProfileController/profile',
            {
                pageTitle: 'Profile',
                user: req.user
            }
        );
    }
}