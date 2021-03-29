import { IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne } from 'typeorm';
import CVEntity from './cv.entity';
import ProjectEntity from './project.entity';
import RequestEntity from './request.entity';

@Entity()
export default class JobSeekersUserEntity extends BaseEntity {

    @PrimaryColumn({length : 100})
    username: String;
    
    @Column({
        nullable : false
    })
    password: Number;

    @Column({
        nullable : false,
        length : 20
    })
    name : String;

    @Column({
        nullable : false,
        length : 20
    })
    lastName : String;

    @Column({
        nullable : false,
        length : 100
    })
    @IsEmail()
    email : string;

    @Column({
        nullable : false,
        length : 11
    })
    @IsPhoneNumber()
    phoneNumber : string;

    @Column({
        nullable : true,
        length : 11
    })
    @IsUrl()
    pictureLink : string;

    @OneToOne(()=>CVEntity,cv => cv.user,{cascade:true})
    cv : CVEntity;

    @OneToMany(()=>ProjectEntity,project=>project.owner)
    ownedProjects : ProjectEntity[];

    @OneToMany(()=>ProjectEntity,project=>project.performer)
    performedProjects : ProjectEntity[];

    @OneToMany(()=>RequestEntity,req=>req.user)
    requests : RequestEntity[];
}