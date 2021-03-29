import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl, Max, IsArray } from 'class-validator';

export class UpdateProjectDTO {
    
    @ApiPropertyOptional(
        {
            description : "title of project",
            maxLength : 100,
            type : "string",
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @MaxLength(100)
    title : string;

    @ApiPropertyOptional(
        {
            description : "priority of project is number between 0 and 5",
            type : "number",
            minimum : 0,
            maximum : 5,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @Min(0)
    @Max(5)
    @IsNumber()
    priority : number;

    @ApiPropertyOptional(
        {
            description : "description of project",
            type : "string",
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    description : string;

    @ApiPropertyOptional(
        {
            description : "duration of project in days",
            type : "number",
            minimum : 1,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @IsNumber()
    @Min(1)
    duration : number;

    @ApiPropertyOptional(
        {
            description : "type of project",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @MaxLength(20)
    type : string;

    @ApiPropertyOptional(
        {
            description : "maximum price of project to start request with",
            type : "number",
            minimum : 0,
            nullable : false,
            required : false
        }
    )
    @Min(0)
    @IsOptional()
    @IsNumber()
    startingPrice : number;

    @ApiPropertyOptional(
        {
            description : "list of requirements for this project",
            type : "array",
            nullable : false,
            required : false
        }
    )
    @IsArray()
    @IsOptional()
    requirements : string[];

} 