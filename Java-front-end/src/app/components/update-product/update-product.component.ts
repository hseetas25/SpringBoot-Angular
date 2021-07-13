import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services';
import { Product } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  isLoggedIn: boolean;
  updateProductForm: FormGroup;
  isFormSubmitted: boolean;
  isRequestInProgress: boolean;
  id: number;
  productData: Product;
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
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
    this.isLoggedIn = false;
    this.loggedIn();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.productService.getProductById(this.id).subscribe((data) => {
      this.productData = data;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.updateProductForm = this.formBuilder.group({
      productName: new FormControl(
        this.productData.productName, [Validators.required]
      ),
      price: new FormControl(
        this.productData.price, [Validators.required]
      ),
      sellingPrice: new FormControl(
        this.productData.sellingPrice, [Validators.required]
      ),
      manufacturedBy: new FormControl(
        this.productData.manufacturedBy, [Validators.required]
      ),
      category: new FormControl(
        this.productData.category, [Validators.required]
      )
    });
  }

  resetForm(): void {
    this.initializeForm();
  }

  updateProduct(): void {
    this.isFormSubmitted = false;
    if (this.updateProductForm.valid && !this.isRequestInProgress) {
      this.isRequestInProgress = true;
      const productDetails: Product = JSON.parse(JSON.stringify(this.updateProductForm.value)) as Product;
      this.productService.updateProduct(this.id, productDetails).subscribe((data) => {
        if (data) {
          this.productService.getProductsList();
          this.router.navigateByUrl('/products');
          this.toastrService.success('Successfully', 'Product Updated');
        }
        else {
          this.toastrService.error('Error Occured');
          this.router.navigateByUrl('/products');
        }
        this.isFormSubmitted = false;
      });
    }
  }

  loggedIn(): void {
    if (localStorage.getItem('userId')) {
      this.isLoggedIn = true;
    } else {
    this.router.navigateByUrl('admin-login');
    }
  }
}
