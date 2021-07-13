import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Java-front-end';
  isLoggedIn: boolean;
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.isLoggedIn = false;
    this.isAdminLoggedIn();
  }

  isAdminLoggedIn(): void {
    const data = localStorage.getItem('userId');
    if (data) {
      this.isLoggedIn = true;
      this.loginService.isAdminLoggedIn();
    }
  }

  logout(): void {
    localStorage.clear();
    this.loginService.logout();
    this.isLoggedIn = false;
    this.toastrService.success('Successfully', 'Logged Out');
  }

}
