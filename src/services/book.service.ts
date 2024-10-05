import { Injectable } from '@nestjs/common';
import {CreateBookDto} from "../dto/controllers/AppController/create-book.dto";


@Injectable()
export class BookService {
    private readonly books: CreateBookDto[] = [];

    create(book: CreateBookDto) {
        this.books.push(book);
    }

    delete(name: string) {
        this.books.forEach((book: CreateBookDto, index: number) => {
            if (book.name === name) {
                this.books.splice(index, 1);
            }
        });
    }

    findAll(): CreateBookDto[] {
        return this.books;
    }
}