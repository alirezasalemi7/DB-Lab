import { IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import JobSeekersUserEntity from './jobseekersUsers.entity';

@Entity()
export default class CVEntity extends BaseEntity {

    @OneToOne(() => JobSeekersUserEntity,user=>user.cv,{eager:true,primary:true})
    @JoinColumn(
        {
            referencedColumnName : "username"
        }
    )
    user : JobSeekersUserEntity;

    @PrimaryGeneratedColumn()
    userCVId : Number;

    @Column({
        nullable : false
    })
    cvText : string;

    @Column("text",{
        nullable : true,
        array : true
    })
    educationalExperiences : {start:Date,end:Date,university:String,description:string}[];

    @Column("text",{
        nullable : true,
        array : true
    })
    workExperiences : {start:Date,end:Date,company:String,description:string}[];
}