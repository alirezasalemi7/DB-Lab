import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export default class CreateBookDto {
    
    @ApiProperty(
        {
            name : "name",
            description : "name of book",
            required : true
        }
    )
    @IsString()
    readonly name: string;
    
    @ApiProperty(
        {
            name : "userId",
            description : "id of user that book belongs to them",
            required : true
        }
    )
    @IsNumber()
    readonly userID: number;

    @ApiProperty(
        {
            name : "genreId",
            description : "id of genres that book belongs to them",
            required : true
        }
    )
    @IsArray()
    readonly genreIDs: number[];
}