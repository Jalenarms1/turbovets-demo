import { Component, Input, OnInit } from '@angular/core';
import { Divider } from '../divider';
import { AuthStateService } from '../../services/AuthStateService';
import { Category, CreateTaskDto, OrganizationDto, Priority, UserDto } from '@monorepo/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/HttpService';
import { TaskService } from '../../services/TaskService';

@Component({
  standalone: true,
  selector: 'app-add-task',
  imports: [Divider, FormsModule, CommonModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {
  @Input() onAdd!: (val: boolean) => void
  constructor(private authState: AuthStateService, private httpService: HttpService, private taskService: TaskService) {}

  createTaskDto: CreateTaskDto = {} as CreateTaskDto

  submitErr: string | null = null


  ngOnInit(): void {
    this.createTaskDto.assignedBy = this.authState.currentUser as UserDto
    this.createTaskDto.organization = this.authState.currentUser?.organization as OrganizationDto
  }

  async submitTask()
  {
    this.createTaskDto.createdAt = new Date()

    if(!this.createTaskDto.title || !this.createTaskDto.dueDate) {
      this.submitErr = "Fill out all fields"
      return
    }

    await this.taskService.createTask(this.createTaskDto)

    this.createTaskDto = {} as CreateTaskDto
    if(this.onAdd) {
      console.log("calling on add");
      
      this.onAdd(false)
    }
  }

  getCategories()
  {
    
    return this.taskService.getCategories()
  }

  getPriorities()
  {
    
    return this.taskService.getPriorities()
  }

}
