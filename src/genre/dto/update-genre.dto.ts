import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class UpdateGenreDto {
    
    @ApiProperty(
        {
            name : "type",
            description : "type of genre",
            required : true
        }
    )
    @IsString()
    readonly type: string;
    
    @ApiProperty(
        {
            name : "id",
            description : "id of genre to be updated",
            required : true
        }
    )
    @IsNumber()
    readonly id : number
}