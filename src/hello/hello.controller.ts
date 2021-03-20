import { Body, Controller, Header, Post } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {

    constructor(private readonly helloService : HelloService){}

    @Post('welcome')
    @Header('Content-Type', 'application/json')
    async sayWelcome(@Body() personDto : PersonDto) : Promise<{data : String}> {
        let msg = await this.helloService.welcome(personDto)
        return {data : msg}
    }
}
