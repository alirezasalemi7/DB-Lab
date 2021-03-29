import { IsDate, IsEmail, IsPhoneNumber, IsUrl, Max, Min } from 'class-validator';
import { type } from 'node:os';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import JobSeekersUserEntity from './jobseekersUsers.entity';
import ProjectEntity from './project.entity';

@Entity()
export default class RequestEntity extends BaseEntity {


    @PrimaryGeneratedColumn()
    id : number;

    @Column(
        {
            nullable : false
        }
    )
    @IsDate()
    date : Date;

    @Column(
        {
            nullable : false
        }
    )
    price : number;

    @Column(
        {
            nullable : false
        }
    )
    description : string;

    @Column(
        {
            nullable : false
        }
    )
    duration : number;

    @ManyToOne(() => JobSeekersUserEntity,user=>user.requests,{nullable:false,eager:true})
    user : JobSeekersUserEntity;

    @ManyToOne(() => ProjectEntity,project=>project.requests,{nullable:false})
    project : ProjectEntity;
    
}