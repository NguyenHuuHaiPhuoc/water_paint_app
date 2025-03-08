import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit{
  
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

  public list_product_item = [
    {
      name: 'Màu hữu cơ in vải',
      path: 'mau-huu-co-in-vai',
      product_id:2
    },
    {
      name: 'Mực in trắng bóng',
      path: 'muc-in-trang-bong',
      product_id:2
    },
    {
      name: 'Trợ chất in vải',
      path: 'tro-chat-in-vai',
      product_id:2
    },
    {
      name: 'Chất hoàn tất cho dệt nhuộm',
      path: 'chat-hoan-tat-cho-det-nhuom',
      product_id:2
    },
  ];

  constructor(
    private localtion: Location
  ) {}

  ngOnInit(): void {
      
  }

  public getPath():string {
    const path = this.localtion.path().split("/");
    return path[path.length-1].toLocaleLowerCase();
  }
}
