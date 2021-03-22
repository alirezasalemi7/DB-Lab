import { Injectable } from '@nestjs/common';
import BookEntity from 'db/entity/book.entity';
import GenreEntity from 'db/entity/genre.entity';
import UserEntity from 'db/entity/user.entity';
import CreateBookDto from './dto/create-book.dto';
import RemoveBookDto from './dto/remove-book.dto';
import UpdateBookDto from './dto/update-book.dto';

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

    async removeBook(bookDetails : RemoveBookDto) : Promise<BookEntity> {
        const {id} = bookDetails
        let book : BookEntity = await BookEntity.findOne({where : {'id':id}})
        if (book){
            BookEntity.remove(book)
        }
        return book
    }

    async update(bookDetails : UpdateBookDto) : Promise<BookEntity> {
        const {id,name,userID,genreIDs} = bookDetails
        let book : BookEntity = await BookEntity.findOne({where : {'id':id}})
        if (book){
            if (name){
                book.name = name
            }
            if (userID) {
                let user : UserEntity = await UserEntity.findOne({where : {id:userID}})
                if (user){
                    book.user = user
                }
            }
            if (genreIDs){
                let genres = []
                genreIDs.forEach(async element => {
                    let genre : GenreEntity = await GenreEntity.findOne({where : {id : element}})
                    if (genre){
                        genres.push(genre)
                    }
                });
                book.genres = genres
            }
            BookEntity.save(book)
        }
        return book
    }
}
