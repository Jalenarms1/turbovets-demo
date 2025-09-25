import { BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto, Status, UpdateTaskDto } from '@monorepo/data';
import { JwtAuthGuard, Roles, RolesGuard } from '@monorepo/auth';
import { UserService } from '../users/users.service';

@Controller("tasks")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private tasksService: TasksService, private userService: UserService) {}

    @Get()
    getTasks() {
        return this.tasksService.findAll();
    }

    @Post()
    @Roles("admin", "owner")
    async createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
        const user = await this.userService.getUserByUsername(createTask.assignedToUsername);
        const {title, dueDate, assignedBy, organization} = createTask

        if(!title || title.trim() == "") throw new BadRequestException("missing data")

        const task = {
            title: title,
            status: Status.Pending,
            createdAt: new Date(),
            dueDate: dueDate,
            assignedTo: user,
            assignedBy: assignedBy,
            organization: organization
        } as Task

        return this.tasksService.create(task)
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {

    }
}
