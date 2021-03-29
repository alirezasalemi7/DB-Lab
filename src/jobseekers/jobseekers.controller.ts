import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import e, { Response, response } from 'express';
import { CreateProjectDTO } from './dto/createProject.dto';
import { CreateRequestDTO } from './dto/createRequest.dto';
import { CVDto } from './dto/cv.dto';
import { JobseekerUserDto } from './dto/JobseekersUser.dto';
import { JobseekerUserUpdateDto } from './dto/jobsekkersUserUpdate.dto';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { UpdateRequestDTO } from './dto/updateRequest.dto';
import { JobseekersService } from './jobseekers.service';

@Controller('jobseekers')
export class JobseekersController {

    constructor(private readonly jobseekersService : JobseekersService){}

    @Get("/users")
    @HttpCode(200)
    @ApiResponse(
        {
            status : 200,
            description : "all users retrieved successfully"
        }
    )
    async getAllUsers(){
        return this.jobseekersService.getAllUsers()
    }

    @Post("/users")
    @ApiResponse(
        {
            status : 200,
            description : "add new user successfully"
        }
    )
    @ApiResponse(
        {
            status : 412,
            description : "duplicate username"
        }
    )
    async addNewUser(@Body() userDto : JobseekerUserDto,@Res() response : Response){
        try {
            let ret = await this.jobseekersService.addNewUser(userDto)
            return response.status(200).json(ret)
            
        } catch (error) {
            return response.status(412).json(
                {
                    status : 412,
                    description: error.message
                }
            )
        }
    }

    @Put("/users")
    @HttpCode(405)
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async putUsers(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Delete("/users")
    @HttpCode(405)
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async deleteUsers(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Get("/users/:id")
    @ApiResponse(
        {
            status : 200,
            description : "user with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found"
        }
    )
    async getUserWithId(@Res() response : Response,@Param("id") id){
        try {
            let ret = await this.jobseekersService.getUser(id)
            return response.status(200).json(ret)
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description: error.message
                }
            )
        }
    }

    @Post("/users/:id")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async postUserWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Put("/users/:id")
    @ApiResponse(
        {
            status : 200,
            description : "user with requested id updated successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found"
        }
    )
    async putUserWithId(@Res() response : Response,@Param("id") id,@Body() userDto : JobseekerUserUpdateDto){
        try {
            return response.status(200).json(await this.jobseekersService.updateUser(userDto,id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Delete("/users/:id")
    @ApiResponse(
        {
            status : 200,
            description : "user with requested id deleted successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found"
        }
    )
    async deleteUserWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.removeUser(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Get("/users/:id/cv")
    @ApiResponse(
        {
            status : 200,
            description : "CV  of user with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found or user doesn't have any CVs"
        }
    )
    async getCVofUserWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.getUserCV(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }    

    @Post("/users/:id/cv")
    @ApiResponse(
        {
            status : 200,
            description : "CV  of user with requested id added successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found"
        }
    )
    async postCVofUserWithId(@Res() response : Response,@Param("id") id,@Body() cv : CVDto){
        try {
            let res = await this.jobseekersService.createNewCVForUser(id,cv)
            return response.status(200).json(res)

        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Put("/users/:id/cv")
    @ApiResponse(
        {
            status : 200,
            description : "CV of user with requested id updated successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found or user doesn't have any CVs"
        }
    )
    async putCVofUserWithId(@Res() response : Response,@Param("id") id,@Body() cvDto){
        try {
            return response.status(200).json(await this.jobseekersService.updateCVForUser(id,cvDto))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Delete("/users/:id/cv")
    @ApiResponse(
        {
            status : 200,
            description : "CV of user with requested id deleted successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user with requested id not found"
        }
    )
    async deleteCVofUserWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.removeCVForUser(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Get("/projects")
    @HttpCode(200)
    @ApiResponse(
        {
            status : 200,
            description : "all projects retrieved successfully"
        }
    )
    async getAllProjects(){
        return await this.jobseekersService.getAllProjects()
    }

    @Post("/projects")
    @ApiResponse(
        {
            status : 200,
            description : "add new project successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "user that make this project not found"
        }
    )
    async addNewProject(@Res() response : Response,@Body() projectDto : CreateProjectDTO){
        try {
            return response.status(200).json(await this.jobseekersService.createNewProject(projectDto))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Put("/projects")
    @HttpCode(405)
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async putProjects(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Delete("/projects")
    @HttpCode(405)
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async deleteProjects(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Get("/projects/:id")
    @ApiResponse(
        {
            status : 200,
            description : "project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project with requested id not found"
        }
    )
    async getProjectWithId(@Param("id") id,@Res() response : Response){
        try {
            return response.status(200).json(await this.jobseekersService.getProjectWithId(id))
        } catch (error) {
            return response.status(404).json(   
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Post("/projects/:id")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async postProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Put("/projects/:id")
    @ApiResponse(
        {
            status : 200,
            description : "project with requested id updated successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project with requested id not found"
        }
    )
    async putProjectWithId(@Res() response : Response,@Param("id") id,@Body() projectDto : UpdateProjectDTO){
        try {
            return response.status(200).json(await this.jobseekersService.updateProjectWithId(id,projectDto))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Delete("/projects/:id")
    @ApiResponse(
        {
            status : 200,
            description : "project with requested id deleted successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project with requested id not found"
        }
    )
    async deleteProjectWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.removeProjectWithId(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Get("/projects/:id/requests")
    @ApiResponse(
        {
            status : 200,
            description : "all requests for project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project with requested id not found"
        }
    )
    async getRequestsForProjectWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.findRequestsOfProjectWithId(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Post("/projects/:id/requests")
    @ApiResponse(
        {
            status : 200,
            description : "create new request for project with requested id"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project or user that sends request doesn't exists"
        }
    )
    async postRequestForProjectWithId(@Res() response : Response,@Param("id") id,@Body() requestDto : CreateRequestDTO){
        try {
            return response.status(200).json(await this.jobseekersService.addNewRequestWithProjectId(id,requestDto))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Put("/projects/:id/requests")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async putRequestForProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Delete("/projects/:id/requests")
    @ApiResponse(
        {
            status : 200,
            description : "all requests for project with requested id deleted successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project with requested id not found"
        }
    )
    async deleteAllRequestsProjectWithId(@Res() response : Response,@Param("id") id){
        try {
            return response.status(200).json(await this.jobseekersService.removeAllRequestForProjectWithId(id))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Get("/projects/:id/requests/:rid")
    @ApiResponse(
        {
            status : 200,
            description : "requests with requested rid for project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project or request with requested id not found"
        }
    )
    async getRequestWithRIDForProjectWithId(@Res() response : Response,@Param("id") id,@Param("rid") rid){
        try {
            return response.status(200).json(await this.jobseekersService.getRequestForProject(id,rid))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Post("/projects/:id/requests/:rid")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async postRequestWithRIDForProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Put("/projects/:id/requests/:rid")
    @ApiResponse(
        {
            status : 200,
            description : "requests with requested rid for project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project or request with requested id not found"
        }
    )
    async putRequestWithRIDForProjectWithId(@Res() response : Response,@Param("id") id,@Param("rid") rid,@Body() requestDto : UpdateRequestDTO){
        try {
            return response.status(200).json(await this.jobseekersService.updateRequestForProject(id,rid,requestDto))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Delete("/projects/:id/requests/:rid")
    @ApiResponse(
        {
            status : 200,
            description : "requests with requested rid for project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project or request with requested id not found"
        }
    )
    async deleteRequestWithRIDProjectWithId(@Res() response : Response,@Param("id") id,@Param("rid") rid){
        try {
            return response.status(200).json(await this.jobseekersService.removeRequestForProject(id,rid))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Get("/projects/:id/requests/:rid/accept")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async getAcceptRequestWithRIDForProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Post("/projects/:id/requests/:rid/accept")
    @ApiResponse(
        {
            status : 200,
            description : "accept requests with requested rid for project with requested id retrieved successfully"
        }
    )
    @ApiResponse(
        {
            status : 404,
            description : "project or request with requested id not found"
        }
    )
    async postAcceptRequestWithRIDForProjectWithId(@Res() response : Response,@Param("id") id,@Param("rid") rid){
        try {
            return response.status(200).json(await this.jobseekersService.acceptRequestForProject(id,rid))
        } catch (error) {
            return response.status(404).json(
                {
                    status : 404,
                    description : error.message
                }
            )
        }
    }

    @Put("/projects/:id/requests/:rid/accept")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async putAcceptRequestWithRIDForProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

    @Delete("/projects/:id/requests/:rid/accept")
    @ApiResponse(
        {
            status : 405,
            description : "this method is not available"
        }
    )
    async deleteAcceptRequestWithRIDProjectWithId(@Res() response : Response){
        return response.status(405).json(
            {
                status : 405,
                description : "this method is not available"
            }
        )
    }

}
