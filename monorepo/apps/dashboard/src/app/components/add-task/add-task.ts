import { Component, OnInit } from '@angular/core';
import { Divider } from '../divider';
import { AuthStateService } from '../../services/AuthStateService';
import { CreateTaskDto, OrganizationDto, UserDto } from '@monorepo/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/HttpService';

@Component({
  standalone: true,
  selector: 'app-add-task',
  imports: [Divider, FormsModule, CommonModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {
  constructor(private authState: AuthStateService, private httpService: HttpService) {}

  createTaskDto: CreateTaskDto = {} as CreateTaskDto

  submitErr: string | null = null


  ngOnInit(): void {
    this.createTaskDto.assignedBy = this.authState.currentUser as UserDto
    this.createTaskDto.organization = this.authState.currentUser?.organization as OrganizationDto
  }

  async submitTask()
  {
    this.createTaskDto.createdAt = new Date()

    var resp = await this.httpService.postData<CreateTaskDto>("/tasks", this.createTaskDto)

    var {message} = await resp?.json()

    if(message) {
      this.submitErr = message
      return
    }

    this.createTaskDto = {} as CreateTaskDto
  }

}
