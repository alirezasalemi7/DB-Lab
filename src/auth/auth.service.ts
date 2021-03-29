import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'db/entity/user.entity';


@Injectable()
export class AuthService {

    constructor(private readonly userService : UserService,private readonly jwtService : JwtService){}

    async validateUser(username,password) : Promise<any> {
        let user = await this.userService.getUser(username)
        if (user){
            if (user.password == password){
                const {password , ...result} = user
                return result
            }
        }
        return null
    }

    async login(user : UserEntity){
        const payload = { username: user.id}
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
