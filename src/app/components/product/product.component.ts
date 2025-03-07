import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  public listProduct = {
    type: 3,
    products: [
      {
        product_name: 'Màu hữu cơ in vải',
      },
      {
        product_name: 'Mực in trắng bóng',
      },
      {
        product_name: 'Trợ chất in vải',
      },
      {
        product_name: 'Chất hoàn tất cho dệt nhuộm',
      },
    ],
  };
}
