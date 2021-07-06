import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models';

import { LoginService } from '../../services';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    isLoggedIn: boolean;
    loginForm: FormGroup;
    isFormSubmitted: boolean;
    isRequestInProgress: boolean;
    adminUsers: Array<Admin>;
    isAdminFound: boolean;
    validationMessages = {
      username: [
        { type: 'required', message: 'User ID is required.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' }
      ]
    };

    constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private toastrService: ToastrService,
      ) {
        this.isFormSubmitted = false;
        this.isRequestInProgress = false;
        this.isLoggedIn = false;
        this.adminUsers = [];
        this.isAdminFound = false;
        this.loggedIn();
       }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:new FormControl(
        '', [Validators.required]),
      password:new FormControl(
        '', [Validators.required]),
    });
  }

  getCredentials(): void {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      this.toastrService.error('Are required', 'Login Details')
      return;
    }
    if (this.loginForm.valid && !this.isRequestInProgress) {
      this.isRequestInProgress = true;
      this.loginService.getAllUsers().subscribe(async (adminData) => {
        await adminData.forEach((admin) => {
          if(admin.userId.toString() === this.loginForm.value.username) {
            this.isAdminFound = true;
            if (admin.password === this.loginForm.value.password) {
              localStorage.setItem("userId", this.loginForm.value.username);
              window.location.reload();
              this.toastrService.success('Successfully', 'Logged In');
            } else {
              this.isRequestInProgress = false;
              this.toastrService.warning('Invalid UserID / Password', 'Login Unsuccessful');
            }
          }
        });
        if (!this.isAdminFound) {
          this.isRequestInProgress = false;
          this.toastrService.error('Invalid Credentials', 'Login Unsuccessful');
        }
      });
    }
  }

  loggedIn(): void {
    if (localStorage.getItem('userId')) {
      this.isLoggedIn = true;
    }
  }

}
