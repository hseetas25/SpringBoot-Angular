import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  constructor(
    private productService: ProductService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProductsList().subscribe((data) =>{
      if(data && data.length) {
        this.products = data;
      }
      else {
        console.log("No Products Available");
      }
    })
  }

  updateProduct(id: number) : void {
    this.router.navigate(['products/update-product', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe((data => {
      if(data) {
        this.getProducts();
        this.router.navigateByUrl("/products");
      }
      else {
        this.router.navigateByUrl("/products");
      }
    }))
  }

}
