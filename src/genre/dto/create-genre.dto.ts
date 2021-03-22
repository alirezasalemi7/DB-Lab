import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class CreateGenreDto {
    
    @ApiProperty(
        {
            name : "type",
            description : "type of genre",
            required : true
        }
    )
    @IsString()
    readonly type: string;
}