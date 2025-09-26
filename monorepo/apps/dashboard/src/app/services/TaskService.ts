import { Injectable } from "@angular/core";
import { HttpService } from "./HttpService";
import { Category, CreateTaskDto, Priority, Roles, TasksDto, UpdateTaskDto } from "@monorepo/data";



@Injectable({
    providedIn: "root"
})
export class TaskService {
    constructor (private httpService: HttpService) {}

    tasks: TasksDto[] = []

    async createTask(createTaskDto: CreateTaskDto) {
        const resp = await this.httpService.postData<CreateTaskDto>("/tasks", createTaskDto)


        const newTask = await resp?.json()

        if(newTask) {
            this.tasks.push(newTask)
        }
        
    }

    async updateTask(updateTaskDto: UpdateTaskDto) {
        const resp = await this.httpService.putData<UpdateTaskDto>(`/tasks/${updateTaskDto.id}`, updateTaskDto)

    }

    async delete(id: string) {
        const resp = await this.httpService.deleteData(`/tasks/${id}`)

        if(resp?.status == 200) {
            this.tasks = this.tasks.filter(t => t.id != id)
        }
    }

    async loadTasks(){
        const tasksResp = await this.httpService.getData<TasksDto[]>("/tasks")

        if(!tasksResp) return

        this.tasks = tasksResp
    }

    canEdit(roleLevel: number) {
        return roleLevel >= 2
    }

    getCategories()
    {
    
    return Object.keys(Category)
    }

    getPriorities()
    {
    
    return Object.keys(Priority)
    }
}