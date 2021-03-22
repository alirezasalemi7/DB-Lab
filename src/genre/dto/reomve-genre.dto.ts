import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class RemoveGenreDto {
    
    @ApiProperty(
        {
            name : "id",
            description : "id of genre to be removed",
            required : true
        }
    )
    @IsNumber()
    readonly id : number
}