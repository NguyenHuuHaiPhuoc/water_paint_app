import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { AESUtil } from '../../../util/aesUtil'
import * as CryptoJS from 'crypto-js';
declare var $:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    ProductService,
  ]
})
export class HomeComponent implements AfterViewInit{
  
  public products:any = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    this.productService.findAll(0,8).subscribe({
      next : (resp) => {
        this.products = resp.content.map(
          (productDTO:any) => JSON.parse(AESUtil.decrypt(productDTO.encryptedData))
        );
      },
      error(err) {
        console.error(err);
      }
    })
  }

  public productDetail(item:any){
    this.router.navigate(['/san-pham/mo-ta-chi-tiet'], { 
      state: { data: item }
    });
  }
}