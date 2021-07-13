import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services';
import { Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  isLoggedIn: boolean;
  addNewProductForm: FormGroup;
  isFormSubmitted: boolean;
  isRequestInProgress: boolean;
  validationMessages = {
    productName: [
      { type: 'required', message: 'Product name is required.' }
    ],
    price: [
      { type: 'required', message: 'Market Price is required.' }
    ],
    sellingPrice: [
      { type: 'required', message: 'Selling Price is required.' }
    ],
    category: [
      { type: 'required', message: 'Food Category is required.' }
    ],
    manufacturedBy: [
      { type: 'required', message: 'Manufactured By is required.' }
    ]
  };
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
    this.isLoggedIn = false;
    this.loggedIn();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addNewProductForm = this.formBuilder.group({
      productName: new FormControl(
        '', [Validators.required]
      ),
      price: new FormControl(
        '', [Validators.required]
      ),
      sellingPrice: new FormControl(
        '', [Validators.required]
      ),
      manufacturedBy: new FormControl(
        '', [Validators.required]
      ),
      category: new FormControl(
        '', [Validators.required]
      )
    });
  }

  addNewProduct(): void {
    this.isFormSubmitted = true;
    if (this.addNewProductForm.valid && !this.isRequestInProgress) {
      const productData: Product = JSON.parse(JSON.stringify(this.addNewProductForm.value)) as Product;
      this.productService.addNewProduct(productData).subscribe((data) => {
        if (data) {
          this.productService.getProductsList();
          this.router.navigateByUrl('/products');
          this.toastrService.success('Successfully', 'Product Added');
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
    this.addNewProductForm.reset();
  }

  loggedIn(): void {
    if (localStorage.getItem('userId')) {
      this.isLoggedIn = true;
    } else {
    this.router.navigateByUrl('admin-login');
    }
  }
}
