import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import RemoveUserDto from './dto/remove-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
    constructor(private readonly usersServices: UserService) {}

    //'postUser()' will handle the creating of new User
    @ApiResponse(
        {
            status : 200,
            description : "successful user creation",
        }
    )
    @Post('post')
    @HttpCode(200)
    postUser( @Body() user: CreateUserDto) {
        return this.usersServices.insert(user);
    }
    
    // 'getAll()' returns the list of all the existing users in the database
    @ApiResponse(
        {
            status : 200,
            description : "get all users successfully"
        }
    )
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAll() {
        return this.usersServices.getAllUsers();
    }

    //'getBooks()' return all the books which are associated with the user 
    // provided through 'userID' by the request  
    @ApiResponse(
        {
            status : 200,
            description : "get books of user successfully"
        }
    )
    @Get('books')
    @UseGuards(AuthGuard('jwt'))
    getBooks( @Body('userID', ParseIntPipe) userID: number ) {
        return this.usersServices.getBooksOfUser(userID);
    }

    @ApiResponse(
        {
            status : 200,
            description : "user updated successfully"
        }
    )
    @Put()
    @UseGuards(AuthGuard('jwt'))
    updateUser(@Body() user : UpdateUserDto) {
        return this.usersServices.updateUser(user)
    }

    @ApiResponse(
        {
            status : 200,
            description : "user deleted successfully"
        }
    )
    @Delete()
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Body() user : RemoveUserDto) {
        return this.usersServices.removeUser(user)
    }

    
}