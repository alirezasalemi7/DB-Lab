import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl, Max, IsArray, IsDate, min } from 'class-validator';

export class CreateRequestDTO {
    
    @ApiProperty(
        {
            description : "price to perform task",
            type : "number",
            minimum : 0,
            nullable : false,
            required : true
        }
    )
    @Min(0)
    price : number;

    @ApiProperty(
        {
            description : "description of request",
            type : "string",
            nullable : false,
            required : true
        }
    )
    description : string;

    @ApiProperty(
        {
            description : "suggested duration in days to perform task",
            type : "number",
            minimum : 1,
            nullable : false,
            required : true
        }
    )
    @Min(1)
    duration : number;

    @ApiProperty(
        {
            description : "username of performer",
            type : "string",
            nullable : false,
            required : true
        }
    )
    username : string
  
} 