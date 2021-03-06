import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(private router: Router,
	  private authService: AuthService) { }

  public get auth(): AuthService {
  	return this.authService;
  }

  public logout(event: Event): void {
  	event.preventDefault();
	  this.authService.logout();
	  this.router.navigate(['/admin', 'login']);
	}
}
