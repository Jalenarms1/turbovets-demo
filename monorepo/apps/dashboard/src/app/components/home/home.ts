import { Component, OnInit } from '@angular/core';
import { Logo } from '../logo';
import { Divider } from '../divider';
import { AuthStateService } from '../../services/AuthStateService';
import { UserDto } from '@monorepo/data';
import { AddTask } from '../add-task/add-task';
import { CommonModule } from '@angular/common';
import { ListTask } from '../list-task/list-task';

@Component({
  selector: 'app-home',
  imports: [Logo, AddTask, CommonModule, ListTask, Divider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private authState: AuthStateService) {}
  currUser: UserDto | null = null
  isShowingAdd: boolean = false

  ngOnInit(): void {
    this.currUser = this.authState.currentUser
  }

  toggleAddTask(val: boolean) {
    console.log("toggle on add");
    
    this.isShowingAdd = val
  }
  
  canAddTask(threshold: number) {
    return (this.currUser?.role?.level ?? 0) >= threshold
  }

  logout() {
    this.authState.handleLogout()
  }

}
