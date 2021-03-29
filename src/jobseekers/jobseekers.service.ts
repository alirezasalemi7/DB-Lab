import { Injectable } from '@nestjs/common';
import CVEntity from 'db/entity/cv.entity';
import JobSeekersUserEntity from 'db/entity/jobseekersUsers.entity';
import ProjectEntity from 'db/entity/project.entity';
import RequestEntity from 'db/entity/request.entity';
import { CreateProjectDTO } from './dto/createProject.dto';
import { CreateRequestDTO } from './dto/createRequest.dto';
import { CVDto } from './dto/cv.dto';
import { JobseekerUserDto } from './dto/JobseekersUser.dto';
import { JobseekerUserUpdateDto } from './dto/jobsekkersUserUpdate.dto';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { UpdateRequestDTO } from './dto/updateRequest.dto';

@Injectable()
export class JobseekersService {

    async getAllUsers() : Promise<JobSeekersUserEntity[]> {
        return JobSeekersUserEntity.find();
    }

    async addNewUser(jobseekersUserDto : JobseekerUserDto) : Promise<JobSeekersUserEntity> {
        const {username,password,name,lastName,email,phoneNumber,pictureLink} = jobseekersUserDto
        let user = await JobSeekersUserEntity.findOne({where : {username : username}})
        if (!user) {
            let user = new JobSeekersUserEntity()
            user.email = email
            user.lastName = lastName
            user.name = name
            user.password = password
            user.phoneNumber = phoneNumber
            user.pictureLink = pictureLink
            user.username = username
            await user.save()
            return user
        }
        else {
            throw Error("user exists")
        }
    }

    async getUser(id : string) : Promise <JobSeekersUserEntity> {
        let user = await JobSeekersUserEntity.findOne({where : {username : id}})        
        if (user){
            return user
        }
        else{
            throw Error("user not found")
        }
    }

    async updateUser(jobseekersUserDto : JobseekerUserUpdateDto,id : String) : Promise<JobSeekersUserEntity> {
        const {password,name,lastName,email,phoneNumber,pictureLink} = jobseekersUserDto
        let user = await JobSeekersUserEntity.findOne({where : {username : id}})
        if (user) {
            if (password) {
                user.password = password
            }
            if (name) {
                user.name = name
            }
            if (lastName) {
                user.lastName = lastName
            }
            if (email) {
                user.email = email
            }
            if (phoneNumber) {
                user.phoneNumber = phoneNumber
            }
            if (pictureLink) {
                user.pictureLink = pictureLink
            }
            await user.save()
            return user
        }
        else {
            throw Error("user not found")
        }
    }

    async removeUser(id : string) : Promise <JobSeekersUserEntity> {
        let user = await JobSeekersUserEntity.findOne({where : {username : id}})
        if (user) {
            await user.remove()
            return user
        }
        else {
            throw Error("user not found")
        }
    }

    async getUserCV(userId : string) : Promise<CVEntity> {
        let user = await JobSeekersUserEntity.findOne({where : {username : userId}})
        if (user){
            let cv = await CVEntity.findOne({where:{user : {username : user.username}}})
            if (cv){
                return cv
            }
            else{
                throw Error("CV of user not found")
            }
        }
        else {
            throw Error("user not found")
        }
    }

    async updateCV(cvText,educationalExperiences,workExperiences,cv : CVEntity) : Promise<CVEntity>{
        cv.cvText = cvText
        if (educationalExperiences){
            cv.educationalExperiences = educationalExperiences    
        }
        else {
            cv.educationalExperiences = []
        }
        if (workExperiences){
            cv.workExperiences = workExperiences
        }
        else {
            cv.workExperiences = workExperiences
        }
        await cv.save()
        return cv
    }

    async createNewCVForUser(userId : string,cvDto : CVDto) : Promise<CVEntity> {
        let user = await JobSeekersUserEntity.findOne({where : {username : userId}})
        if (user){
            const {cvText,educationalExperiences,workExperiences} = cvDto
            let cv = new CVEntity()
            cv.user = user
            cv = await this.updateCV(cvText,educationalExperiences,workExperiences,cv)
            return cv
        }
        else {
            throw Error("user not found")
        }
    }

    async updateCVForUser(userId : string,cvDto : CVDto) : Promise<CVEntity> {
        try {
            let cv = await this.getUserCV(userId)
            const {cvText,educationalExperiences,workExperiences} = cvDto
            cv = await this.updateCV(cvText,educationalExperiences,workExperiences,cv)
            return cv
        }
        catch(error) {
            console.log(error.message)
            throw error
        }
    }

    async removeCVForUser(userId : string) : Promise <CVEntity> {
        let user = await JobSeekersUserEntity.findOne({where : {username : userId}})
        if (user){
            let cv : CVEntity = await CVEntity.findOne({where : {user : user}})
            if (cv) {
                await cv.remove()
                return cv
            }
            else {
                throw Error("cv of user not found")    
            }
        }
        else {
            throw Error("user not found")
        }
    }

    async getAllProjects() : Promise <ProjectEntity[]> {
        return await ProjectEntity.find()
    }

    async createNewProject(projectDto : CreateProjectDTO) : Promise<ProjectEntity> {
        const {description,duration,priority,requirements,startingPrice,title,type,username} = projectDto
        try {
            let user = await this.getUser(username)
            let project = new ProjectEntity()
            project.description = description
            project.duration = duration
            project.owner = user
            project.priority = priority
            project.requirements = requirements
            project.startingPrice = startingPrice
            project.title = title
            project.type = type
            await project.save()
            return project
        }
        catch (error){
            throw error
        }
    }

    async getProjectWithId(id : number) : Promise<ProjectEntity> {
        let project = await ProjectEntity.findOne({where:{id : id}})
        if (project){
            return project
        }
        else {
            throw Error("project with given id does not exist")
        }
    }

    async updateProjectWithId(id : number,projectDto : UpdateProjectDTO) : Promise<ProjectEntity> {
        try {
            let project = await this.getProjectWithId(id)
            const {description,duration,priority,requirements,startingPrice,title,type} = projectDto
            if (description) {
                project.description = description
            }
            if (duration) {
                project.duration = duration
            }
            if (priority) {
                project.priority = priority
            }
            if (requirements) {
                project.requirements = requirements
            }
            if (startingPrice) {
                project.startingPrice = startingPrice
            }
            if (title) {
                project.title = title
            }
            if (type) {
                project.type = type
            }
            await project.save()
            return project
        }
        catch (error){
            throw error
        }
    }

    async removeProjectWithId(id : number) : Promise<ProjectEntity> {
        try {
            let project = await this.getProjectWithId(id)
            await project.remove()
            return project
        }
        catch (error) {
            throw error
        }
    }

    async findRequestsOfProjectWithId(id : number) : Promise<RequestEntity[]> {
        try {
            let project = await this.getProjectWithId(id)
            let requests = await RequestEntity.find({where : {project : {id : project.id}}})
            return requests
        }
        catch (error) {
            throw error
        }
    }

    async addNewRequestWithProjectId(id : number,requestDto : CreateRequestDTO) : Promise<RequestEntity> {
        try {
            let project = await this.getProjectWithId(id)
            const {description,duration,price,username} = requestDto
            let user = await this.getUser(username)
            let request = new RequestEntity()
            request.date = new Date()
            request.description = description
            request.duration = duration
            request.price = price
            request.project = project
            request.user = user
            await request.save()
            return request
        }
        catch (error){
            throw error
        }
    }

    async removeAllRequestForProjectWithId(id : number) : Promise<RequestEntity[]> {
        try {
            let project = await this.getProjectWithId(id)
            let requests = await RequestEntity.find({where : {project : project}})
            for (let i = 0; i < requests.length; i++){
                await requests[i].remove()
            }
            return requests
        } catch (error) {
            throw error
        }
    }

    async getRequestForProject(pid : number,rid : number) : Promise<RequestEntity> {
        try {
            let project = await this.getProjectWithId(pid)
            let request = await RequestEntity.findOne({where : {id : rid,project : {id : project.id}}})
            return request
        } catch (error) {
            throw error
        }
    }

    async updateRequestForProject(pid : number,rid : number,requestDto : UpdateRequestDTO) : Promise<RequestEntity> {
        try {
            let request = await this.getRequestForProject(pid,rid)
            const {description,duration,price} = requestDto
            if (description) {
                request.description = description
            }
            if (duration) {
                request.duration = duration
            }
            if (price) {
                request.price = price
            }
            await request.save()
            return request 
        } catch (error) {
            throw error
        }
    }

    async removeRequestForProject(pid : number,rid : number) : Promise<RequestEntity> {
        try {
            let request = await this.getRequestForProject(pid,rid)
            await request.remove()
            return request 
        } catch (error) {
            throw error
        }
    }

    async acceptRequestForProject(pid : number,rid : number) : Promise<ProjectEntity> {
        try {
            let request = await this.getRequestForProject(pid,rid)
            let project = await this.getProjectWithId(pid)
            project.performer = request.user
            await project.save()
            return project
        } catch (error) {
            throw error
        }
    }
}
