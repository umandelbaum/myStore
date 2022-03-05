import { Component, OnInit } from '@angular/core';
import { Order } from '../model/orderModel';
import { Product } from '../model/productModel';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { orderedProduct } from '../model/orderedProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInOrder: Product[] = [];
  order : Order = new Order();

  constructor(private productService:ProductService, 
              private orderService:OrderService) { }

  ngOnInit(): void {
    this.order = this.orderService.getOrder();
    const keys = this.order.orderedProducts.keys()
    this.productService.getProducts().subscribe((res):void => {      
      const allProducts = res;
      this.productsInOrder = res.filter(p => p.id in keys)
    });   
  }

}
