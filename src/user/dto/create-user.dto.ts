import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, Length } from "class-validator";

export default class CreateUserDto {
    
    @ApiProperty(
        {
            name : "name",
            description : "Name of the user",
            required : true,
            minLength : 3,
            maxLength : 20
        }
    )
    @Length(3,20)
    @IsString()
    name: string;
    
    @ApiProperty({
        name : "books",
        description : "List of user books",
        isArray : true,
        required : true
    })
    @IsArray()
    books: number[] ;
}
