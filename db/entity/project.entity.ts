import { IsEmail, IsPhoneNumber, IsUrl, Max, Min } from 'class-validator';
import { type } from 'node:os';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn, OneToOne, ManyToOne } from 'typeorm';
import JobSeekersUserEntity from './jobseekersUsers.entity';
import RequestEntity from './request.entity';

@Entity()
export default class ProjectEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length : 100,
        nullable : false
    })
    title : string;

    @Column({
        nullable : false
    })
    @Min(0)
    @Max(5)
    priority : number;

    @Column({
        nullable : false
    })
    description : string;

    @Column({
        nullable : false
    })
    duration : number;

    @Column({
        nullable : false,
        length : 20
    })
    type : string;

    @Column({
        nullable : false
    })
    startingPrice : number;

    @Column("text",{
        nullable : false,
        array : true
    })
    requirements : string[];

    @ManyToOne(()=>JobSeekersUserEntity,user=>user.ownedProjects,{nullable:false})
    owner : JobSeekersUserEntity;

    @ManyToOne(() => JobSeekersUserEntity,user=>user.performedProjects)
    performer : JobSeekersUserEntity;

    @OneToMany(()=>RequestEntity,req=>req.project)
    requests : RequestEntity[];

}