import { Injectable } from '@nestjs/common';
import GenreEntity from 'db/entity/genre.entity';
import CreateGenreDto from './dto/create-genre.dto';
import RemoveGenreDto from './dto/reomve-genre.dto';
import UpdateGenreDto from './dto/update-genre.dto';

@Injectable()
export class GenreService {

    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {
        const genreEntity: GenreEntity = GenreEntity.create();
        const {type} = genreDetails;
    
        genreEntity.type = type;
        await GenreEntity.save(genreEntity);
        return genreEntity;
    }

    async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
    }

    async updateGenre(genreDetails : UpdateGenreDto) : Promise<GenreEntity> {
        const {type,id} = genreDetails
        let genre: GenreEntity = await GenreEntity.findOne({where : {id : id}})
        genre.type = type
        let genreUpdated = await GenreEntity.save(genre)
        return genreUpdated
    }

    async removeGenre(genreDetails : RemoveGenreDto) : Promise<GenreEntity> {
        const {id} = genreDetails
        let genre : GenreEntity = await GenreEntity.findOne({where : {id : id}})
        if (genre){
            GenreEntity.remove(genre)
        }
        return genre
    }
}
