import { Body, Controller, Delete, Get, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import RemoveBookDto from './dto/remove-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {

    constructor(private readonly bookService : BooksService) {}

    @ApiResponse(
        {
            status : 200,
            description : "Book created successfully"
        }
    )
    @Post("post")
    @HttpCode(200)
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

    @ApiResponse(
        {
            status : 200,
            description : "book deleted successfully"
        }
    )
    @Delete()
    deleteBook(@Body() bookDetails : RemoveBookDto){
        return this.bookService.removeBook(bookDetails)
    }

    @ApiResponse(
        {
            status : 200,
            description : "book updated successfully"
        }
    )
    @Put()
    updateBook(@Body() bookDetails : UpdateBookDto){
        return this.bookService.update(bookDetails)
    }
}
