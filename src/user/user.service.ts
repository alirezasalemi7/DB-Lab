import { Injectable } from '@nestjs/common';
import BookEntity from 'db/entity/book.entity';
import UserEntity from 'db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import RemoveUserDto from './dto/remove-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UserService {
    async insert(userDetails: CreateUserDto): Promise<UserEntity> {
        const userEntity: UserEntity = UserEntity.create();
        const {name } = userDetails;
        userEntity.name = name;
        await UserEntity.save(userEntity);
        return userEntity;
    }
    
    async getAllUsers(): Promise<UserEntity[]> {
        return await UserEntity.find();
    }

    async getBooksOfUser(userID: number): Promise<BookEntity[]> {
        console.log(typeof(userID));
        const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
        return user.books;
    }

    async removeUser(userDetails : RemoveUserDto) : Promise<UserEntity> {
        const {id} = userDetails
        let user : UserEntity = await UserEntity.findOne({where : {id : id}})
        if (user){
            UserEntity.remove(user)
        }
        return user
    }

    async updateUser(userDetails : UpdateUserDto) : Promise<UserEntity> {
        const {id,name,books} = userDetails
        let user : UserEntity = await UserEntity.findOne({where : {id : id}})
        if (user){
            if (name){
                user.name = name
            }
            if (books){
                let updatedBooks = []
                for (let element of books){
                    let book = await BookEntity.findOne({where:{id:element}})
                    if (book){
                        updatedBooks.push(book)
                    }
                }
                user.books = updatedBooks
            }
            UserEntity.save(user)
        }
        return user
    }
}
