import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/productModel';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  id : Number = 0;
  product : Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: ''
  }

  constructor(private router: Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.id = parseInt(this.router.url.split('/')[2]);
    this.productService.getProducts().subscribe((res):void => {      
      this.product = res.filter(p => p.id == this.id)[0];
    });
  }

}
