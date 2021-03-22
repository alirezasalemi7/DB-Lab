import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, Length } from "class-validator";

export default class UpdateUserDto {

    @ApiProperty(
        {
            name : "id",
            description : "id of user to be updated",
            required : true
        }
    )
    @IsNumber()
    id : number

    @ApiProperty(
        {
            name : "name",
            description : "Name of the user",
            required : false,
            minLength : 3,
            maxLength : 20
        }
    )
    @Length(3,20)
    @IsString()
    @IsOptional()
    name: string;
    
    @ApiProperty({
        name : "books",
        description : "List of user books",
        isArray : true,
        required : false
    })
    @IsArray()
    @IsOptional()
    books: number[] ;
}
