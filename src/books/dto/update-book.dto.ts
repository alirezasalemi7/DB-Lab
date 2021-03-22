import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateBookDto {
    
    @ApiProperty(
        {
            name : "id",
            description : "id of book to be updated",
            required : true
        }
    )
    @IsNumber()
    readonly id : number
    
    @ApiProperty(
        {
            name : "name",
            description : "name of book",
            required : false
        }
    )
    @IsString()
    @IsOptional()
    readonly name: string;
    
    @ApiProperty(
        {
            name : "userId",
            description : "id of user that book belongs to",
            required : false
        }
    )
    @IsNumber()
    @IsOptional()
    readonly userID: number;

    @ApiProperty(
        {
            name : "genreId",
            description : "id of genres that book belongs to them",
            required : false
        }
    )
    @IsOptional()
    @IsArray()
    readonly genreIDs: number[];
}