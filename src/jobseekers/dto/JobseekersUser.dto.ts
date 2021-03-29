import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber, MaxLength, IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';

export class JobseekerUserDto {
    
    @ApiProperty(
        {
            description : "username of user",
            maxLength : 100,
            type : "string",
            nullable : false,
            required : true
        }
    )
    @MaxLength(100)
    username: String;
    
    @ApiProperty(
        {
            description : "hash of user password of user",
            type : "number",
            nullable : false,
            required : true
        }
    )
    @IsNumber()
    password: Number;

    @ApiProperty(
        {
            description : "name of user",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : true
        }
    )
    @MaxLength(20)
    name : String;

    @ApiProperty(
        {
            description : "lastname of user",
            type : "string",
            maxLength : 20,
            nullable : false,
            required : true
        }
    )
    @MaxLength(20)
    lastName : String;

    @ApiProperty(
        {
            description : "email of user",
            type : "string",
            maxLength : 100,
            nullable : false,
            required : true
        }
    )
    @MaxLength(100)
    @IsEmail()
    email : string;

    @ApiProperty(
        {
            description : "phone number of user",
            type : "string",
            maxLength : 11,
            nullable : false,
            required : true
        }
    )
    @Length(11)
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
    @IsUrl()
    @IsOptional()
    pictureLink : string;
} 