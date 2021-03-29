import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl, IsArray } from 'class-validator';

export class CVDto {
    
    @ApiProperty(
        {
            description : "text of cv",
            type : "string",
            nullable : false,
            required : true
        }
    )
    cvText: string;

    @ApiPropertyOptional(
        {
            description : "educational experiences",
            type : "string",
            nullable : true,
            required : false
        }
    )
    @IsArray()
    @IsOptional()
    educationalExperiences : {start:Date,end:Date,university:String,description:string}[];

    @ApiPropertyOptional(
        {
            description : "work experiences",
            type : "json",
            nullable : true,
            required : false
        }
    )
    @IsArray()
    @IsOptional()
    workExperiences : {start:Date,end:Date,company:String,description:string}[];
    
} 