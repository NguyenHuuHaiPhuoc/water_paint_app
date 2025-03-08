import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  imports: [],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit{
  public listProduct = [
    {
      id: 1,
      product_name: 'nguyên liệu sơn & xây dựng',
      path: 'nguyen-lieu-son-hoa-chat'
    },
    {
      id: 2,
      product_name: 'hóa chất vải & dệt nhuộm',
      path: 'hoa-chat-vai-det-nhuom'
    },
    {
      id: 3,
      product_name: 'bột màu hữu cơ',
      path: 'bot-mau-huu-co'
    },
    {
      id: 4,
      product_name: 'phụ gia thực phẩm',
      path: 'phu-gia-thuc-pham'
    },
  ];

  public title = '';

  constructor(
    private localtion: Location
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < this.listProduct.length; i++) {
      if(this.listProduct[i].path == this.getPath()){
        this.title = this.listProduct[i].product_name;
        break;
      }
    }
  }

  public getPath():string {
    const url = this.localtion.path();
    const path = url.split("/");
    return path[path.length-1].toLocaleLowerCase();
  }
}