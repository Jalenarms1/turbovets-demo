import { Component, OnInit } from '@angular/core';
import { Divider } from '../divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../services/AuthStateService';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [Divider, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(private authStateService: AuthStateService, private router: Router) {}

  username: string = ""
  password: string = ""
  loginErr: string | null = null


  ngOnInit(): void {
    console.log("initialized")
    if(this.authStateService.currentUser) {
      this.router.navigateByUrl("/")
    }
  }

  canSubmit(): boolean {

    if(!this.password || this.password.trim() == "") return false

    if(!this.username || this.username.trim() == "") return false

    return true
  }

  async submitLogin()
  {
    this.loginErr = null

    this.loginErr = await this.authStateService.handleLogin({username: this.username, password: this.password})
    
  }
}
