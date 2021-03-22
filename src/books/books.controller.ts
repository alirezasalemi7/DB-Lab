import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';

@Controller('books')
export class BooksController {

    constructor(private readonly bookService : BooksService) {}

    @ApiResponse(
        {
            status : 200,
            description : "Book created successfully"
        }
    )
    @Post("post")
    createBook(@Body() book : CreateBookDto) {
        return this.bookService.insert(book)
    }

    @ApiResponse(
        {
            status : 200,
            description : "all books retrieved successfully"
        }
    )
    @Get()
    getAll(){
        return this.bookService.getAllBooks()
    } 
}
