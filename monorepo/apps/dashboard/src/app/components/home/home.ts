import { Component, OnInit } from '@angular/core';
import { Logo } from '../logo';
import { Divider } from '../divider';
import { AuthStateService } from '../../services/AuthStateService';
import { UserDto } from '@monorepo/data';
import { AddTask } from '../add-task/add-task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Logo, AddTask, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private authState: AuthStateService) {}
  currUser: UserDto | null = null

  ngOnInit(): void {
    this.currUser = this.authState.currentUser
  }
  
  canAddTask(threshold: number) {
    return (this.currUser?.role?.level ?? 0) >= threshold
  }

  logout() {
    this.authState.handleLogout()
  }

}
