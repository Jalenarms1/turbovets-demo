import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { FormsModule } from '@angular/forms';
import { Divider } from './components/divider';
import { CommonModule } from '@angular/common';
import { AuthStateService } from './services/AuthStateService';


@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private authStateService: AuthStateService, private router: Router) {}
  protected title = 'dashboard';

  ngOnInit(): void {
    if(!this.authStateService.currentUser) {
      this.router.navigateByUrl("/login")
    }
  }
}
