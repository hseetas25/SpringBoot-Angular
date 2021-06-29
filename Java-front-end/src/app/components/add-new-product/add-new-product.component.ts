import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services';
import { Product } from 'src/app/models';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

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
  ) {
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
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
    })
  }

  addNewProduct(): void {
    this.isFormSubmitted = true;
    if(this.addNewProductForm.valid && !this.isRequestInProgress) {
      const productData: Product = JSON.parse(JSON.stringify(this.addNewProductForm.value)) as Product;
      this.productService.addNewProduct(productData).subscribe((data) =>{
        if(data) {
          this.productService.getProductsList();
          this.router.navigateByUrl("/products");
        }
        else {
          this.router.navigateByUrl("/products");
        }
        this.isFormSubmitted = false;
      })
    }
  }

  resetForm(): void {
    this.addNewProductForm.reset();
  }
}
