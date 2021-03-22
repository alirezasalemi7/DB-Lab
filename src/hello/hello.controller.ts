import { Body, Controller, Get, Header, HttpCode, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PersonDto } from './dto/person.dto';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {

    constructor(private readonly helloService : HelloService){}

    @Post('welcome')
    @HttpCode(200)
    @ApiResponse({status:200,description:"say Hello!!!"})
    @Header('Content-Type', 'application/json')
    async sayWelcome(@Body() personDto : PersonDto) : Promise<{data : String}> {
        let msg = await this.helloService.welcome(personDto)
        return {data : msg}
    }

    @ApiResponse({status:200})
    @ApiQuery(
        {
            name : 'name',
            required : true,
            type : String
        }
    )
    @ApiQuery(
        {
            name : 'year',
            required : false,
            type : Number,
            description : "you can ignore this"
        }
    )
    @Get('welcome')
    async sayWelcome2(@Query('name') name,@Query('year') year) : Promise<{data : String}> {
        let msg = await this.helloService.welcome({'name':name,'year':year})
        return {data : msg}
    }
}
