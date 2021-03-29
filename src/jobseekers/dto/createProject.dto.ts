import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl, Max, IsArray } from 'class-validator';

export class CreateProjectDTO {
    
    @ApiProperty(
        {
            description : "username of owner user",
            maxLength : 100,
            type : "string",
            nullable : false,
            required : true
        }
    )
    @MaxLength(100)
    username: string;

    @ApiProperty(
        {
            description : "title of project",
            maxLength : 100,
            type : "string",
            nullable : false,
            required : true
        }
    )
    @MaxLength(100)
    title : string;

    @ApiProperty(
        {
            description : "priority of project is number between 0 and 5",
            type : "number",
            nullable : false,
            minimum : 0,
            maximum : 5,
            required : true
        }
    )
    @Min(0)
    @Max(5)
    @IsNumber()
    priority : number;

    @ApiProperty(
        {
            description : "description of project",
            type : "string",
            nullable : false,
            required : true
        }
    )
    description : string;

    @ApiProperty(
        {
            description : "duration of project in days",
            type : "number",
            minimum : 1,
            nullable : false,
            required : true
        }
    )
    @IsNumber()
    @Min(1)
    duration : number;

    @ApiProperty(
        {
            description : "type of project",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : true
        }
    )
    @MaxLength(20)
    type : string;

    @ApiProperty(
        {
            description : "maximum price of project to start request with",
            type : "number",
            minimum : 0,
            nullable : false,
            required : true
        }
    )
    @Min(0)
    @IsNumber()
    startingPrice : number;

    @ApiProperty(
        {
            description : "list of requirements for this project",
            type : "array",
            nullable : false,
            required : true
        }
    )
    @IsArray()
    requirements : string[];

} 