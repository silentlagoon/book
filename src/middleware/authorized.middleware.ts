import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";
import Handlebars from "handlebars";

@Injectable()
export class AuthorizedMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        // console.log(req.raw);
        // console.log(req.session.user ?? undefined);
        // const user = req.session.user ?? undefined;
        // const Handlebars = require('handlebars');
        //
        // console.log('middleware', user)
        // Handlebars.registerHelper('isAuthorized', user ?? false);

        next();
    }
}
