import { Controller, Get, Post, Body, Res, Param, Redirect } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateBookDto } from "./dto/controllers/AppController/create-book.dto";
import { BookService } from "./services/book.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly bookService: BookService,
    ) {
    }

    @Get()
    findAll(@Res() res: Response) {
        return res.render(
        './controllers/AppController/books-list',
            { books: this.bookService.findAll()}
        );
    }

    @Get('create')
    bookForm(@Res() res: Response) {
        return res.render(
            './controllers/AppController/book-form'
        );
    }

    @Post('create')
    async createBook(@Body() createBookDto: CreateBookDto): Promise<string> {
        this.bookService.create(createBookDto);
        return 'New book has been created';
    }

    @Post('delete/:name')
    @Redirect('/', 302)
    remove(@Param('name') name: string) {
        this.bookService.delete(name);
    }
}
