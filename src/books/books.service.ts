import { Injectable } from '@nestjs/common';
import BookEntity from 'db/entity/book.entity';
import GenreEntity from 'db/entity/genre.entity';
import UserEntity from 'db/entity/user.entity';
import CreateBookDto from './dto/create-book.dto';

@Injectable()
export class BooksService {
    
    async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
        const { name , userID , genreIDs } = bookDetails;
        const book = new BookEntity();
        book.name = name;
        book.user = await UserEntity.findOne(userID) ;
        book.genres=[];
        for ( let i = 0; i < genreIDs.length ; i++)
        {
                    const genre = await GenreEntity.findOne(genreIDs[i]);
                    book.genres.push(genre);
        }
        await book.save();
        return book;
    }

    async getAllBooks(): Promise<BookEntity[] > {
        // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
        return BookEntity.find();
    }
}
