import { Body, Controller, Delete, Get, HttpCode, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import CreateGenreDto from './dto/create-genre.dto';
import RemoveGenreDto from './dto/reomve-genre.dto';
import UpdateGenreDto from './dto/update-genre.dto';
import { GenreService } from './genre.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('genre')
@UseGuards(AuthGuard('jwt'))
export class GenreController {
    
    constructor(private readonly genreServices: GenreService) {}
    

    @ApiResponse(
        {
            status : 200,
            description : "genre added successfully"
        }
    )
    @Post('post')
    @HttpCode(200)
    postGenre( @Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }
    
    @ApiResponse(
        {
            status : 200,
            description : "all genres retrieve successfully"
        }
    )
    @Get()
    getAll() {
        return this.genreServices.getAllGenre();
    }

    @ApiResponse(
        {
            status : 200,
            description : "genre updated successfully"
        }
    )
    @Put()
    updateGenre(@Body() genre : UpdateGenreDto){
        return this.genreServices.updateGenre(genre)
    }

    @ApiResponse(
        {
            status : 200,
            description : "genre deleted successfully"
        }
    )
    @Delete()
    removeGenre(@Body() genre : RemoveGenreDto){
        return this.genreServices.removeGenre(genre)
    }
    
}
