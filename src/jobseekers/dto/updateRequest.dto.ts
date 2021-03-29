import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl, Max, IsArray, IsDate, min } from 'class-validator';

export class UpdateRequestDTO {
    
    @ApiPropertyOptional(
        {
            description : "price to perform task",
            type : "number",
            minimum : 0,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @Min(0)
    price : number;

    @ApiPropertyOptional(
        {
            description : "description of request",
            type : "string",
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    description : string;

    @ApiPropertyOptional(
        {
            description : "suggested duration in days to perform task",
            type : "number",
            minimum : 1,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @Min(1)
    duration : number;  
} 