import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export default class RemoveUserDto {
    
    @ApiProperty(
        {
            name : "id",
            description : "id of user to be removed",
            required : true
        }
    )
    @IsNumber()
    readonly id : number
}