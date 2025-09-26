import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HttpService';
import { TasksDto, UpdateTaskDto } from '@monorepo/data';
import { TaskService } from '../../services/TaskService';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../services/AuthStateService';

@Component({
  standalone: true,
  selector: 'app-list-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-task.html',
  styleUrl: './list-task.css',
})
export class ListTask implements OnInit {
  _taskService: TaskService
  constructor (private httpService: HttpService, taskService: TaskService, private authService: AuthStateService){
    this._taskService = taskService
  }

  tasks: TasksDto[] = []


  canEdit(){
    return this._taskService.canEdit(this.authService.currentUser?.role?.level ?? 0)
  }

  async ngOnInit(): Promise<void> {
    // const resp = await this.httpService.getData<TasksDto[]>("/tasks")
    // if(!resp) return

    // this.tasks = resp

    await this._taskService.loadTasks()

  }

  async handleUpdate(task: UpdateTaskDto) {
    await this._taskService.updateTask(task)
  }

  async handleDelete(id: string) {
    await this._taskService.delete(id)
  }

  getCategories()
  {
    
    return this._taskService.getCategories()
  }

  getPriorities()
  {
    
    return this._taskService.getPriorities()
  }
}
