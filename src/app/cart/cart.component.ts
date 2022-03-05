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
  total : number = 0;

  constructor(private productService:ProductService, 
              private orderService:OrderService) { }

  ngOnInit(): void {
    this.order = this.orderService.getOrder();
    const keys = Array.from(this.order.orderedProducts.keys());    
    this.productService.getProducts().subscribe((res):void => {      
      const allProducts = res;
      this.productsInOrder = allProducts.filter(p => keys.includes(p.id));
      this.calculateTotal();
    });       
  }

  changeOrder(update:orderedProduct):void{    
    this.orderService.updateOrder(update);
    this.calculateTotal();
  }

  calculateTotal():void{
    this.total = 0;    
    for (let index = 0; index < this.productsInOrder.length; index++) {
      const element = this.productsInOrder[index];
      const quantity = this.order.orderedProducts.get(element.id) as number;      
      this.total = this.total + (element.price*quantity);
    }
    //alert(this.total)
  }

}
