import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';

export class JobseekerUserUpdateDto {
    
    @ApiPropertyOptional(
        {
            description : "hash of user password of user",
            type : "number",
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @IsNumber()
    password: Number;

    @ApiPropertyOptional(
        {
            description : "name of user",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @MaxLength(20)
    name : String;

    @ApiPropertyOptional(
        {
            description : "lastname of user",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : false
        }
    )
    @IsOptional()
    @MaxLength(20)
    lastName : String;

    @ApiPropertyOptional(
        {
            description : "email of user",
            type : "string",
            maxLength : 100,
            nullable : false,
            required : false
        }
    )
    @MaxLength(100)
    @IsEmail()
    @IsOptional()
    email : string;

    @ApiPropertyOptional(
        {
            description : "phone number of user",
            type : "string",
            maxLength : 11,
            nullable : false,
            required : false
        }
    )
    @Length(11)
    @IsOptional()
    @IsPhoneNumber("IR")
    phoneNumber : string;

    @ApiPropertyOptional(
        {
            description : "url to image of user",
            type : "string",
            nullable : true,
            required : false
        }
    )
    @IsOptional()
    @IsUrl()
    pictureLink : string;
} 