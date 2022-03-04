import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { orderedProduct } from '../model/orderedProduct';
import { Product } from '../model/productModel';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product:Product;
  orderedProduct: orderedProduct;
  @Output() alterOrder: EventEmitter<orderedProduct> = new EventEmitter;

  constructor() { 
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
    this.orderedProduct = {
      id: 1,
      quantity: 0
    }
  }

  ngOnInit(): void { 
    this.orderedProduct.id = this.product.id;
  }

  addToOrder(quantity:number){
    this.orderedProduct.quantity = quantity;
    this.alterOrder.emit(this.orderedProduct);
  }

}
