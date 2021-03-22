import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class RemoveBookDto {
    
    @ApiProperty(
        {
            name : "id",
            description : "id of book to be removed",
            required : true
        }
    )
    @IsNumber()
    readonly id : number
}