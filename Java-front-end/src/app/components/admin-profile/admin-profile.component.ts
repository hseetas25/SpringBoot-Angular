import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  isLoggedIn: boolean;
  updateProfileForm: FormGroup;
  isFormSubmitted: boolean;
  isRequestInProgress: boolean;
  adminData: Admin;
  validationPattern = {
    phoneNumber: new RegExp(`[0-9]{10}$`)
  };
  validationMessages = {
    userId: [
      { type: 'required', message: 'User ID is required.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Phone Number should be valid.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const userId: number = +localStorage.getItem('userId');
    if (userId) {
      this.loginService.getUserById(userId).subscribe((data) => {
        if (data) {
          this.adminData = data;
        }
        this.initializeForm();
      });
    }
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
    this.isLoggedIn = false;
    this.loggedIn();
  }

  initializeForm(): void {
    this.updateProfileForm = this.formBuilder.group({
      userId: new FormControl(
        {value: this.adminData.userId, disabled: true }, [Validators.required],
      ),
      name: new FormControl(
        this.adminData.name, [Validators.required]
      ),
      phoneNumber: new FormControl(
        this.adminData.phoneNumber, [Validators.required, Validators.pattern(this.validationPattern.phoneNumber)]
      ),
      password: new FormControl(
        this.adminData.password, [Validators.required]
      ),
    });
  }

  updateAdminProfile(): void {
    this.isFormSubmitted = true;
    if (this.updateProfileForm.valid && !this.isRequestInProgress) {
      const adminData: Admin = JSON.parse(JSON.stringify(this.updateProfileForm.value)) as Admin;
      const userId: number = +localStorage.getItem('userId');
      this.loginService.updateAdmin(userId, adminData).subscribe((data) => {
        if (data) {
          this.router.navigateByUrl('/products');
          this.toastrService.success('Successfully', 'Profile Updated');
        }
        else {
          this.router.navigateByUrl('/products');
          this.toastrService.error('', 'Error Occured');
        }
        this.isFormSubmitted = false;
      });
    }
  }

  resetForm(): void {
    this.initializeForm();
  }

  loggedIn(): void {
    if (localStorage.getItem('userId')) {
      this.isLoggedIn = true;
    } else {
    this.router.navigateByUrl('admin-login');
    }
  }

}
