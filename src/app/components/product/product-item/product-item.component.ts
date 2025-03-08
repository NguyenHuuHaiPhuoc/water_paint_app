import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
 public product_name = 'ABC';

 constructor(
  private localtion: Location
) {}

ngOnInit(): void {
      
}

 public getPath():string {
  const path = this.localtion.path().split("/");
  return path[path.length-2].toLocaleLowerCase();
}
}