import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length , IsOptional, Min, IsNumber } from 'class-validator';

export class PersonDto {
    
    @Length(3, 10)
    @ApiProperty(
        {
            description : "Enter Your Name >",
            minLength : 3,
            maxLength : 10,
            default : "Ali"
        }
    )
    name: string;
    
    @ApiPropertyOptional(
        {
            description:"optional",
            default : 1998,
            minimum : 1960
        }
    )
    @IsNumber()
    @IsOptional()
    @Min(1960)
    year: number;
} 