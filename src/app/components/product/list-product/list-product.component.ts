import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { AESUtil } from '../../../util/aesUtil'
import * as CryptoJS from 'crypto-js';

declare var $:any;
@Component({
  selector: 'app-list-product',
  imports: [
    
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  providers: [
    ProductService
  ]
})
export class ListProductComponent implements OnInit{
  public products:any = [];
  public isPrev:any;
  public isNext:any;
  public totalPages:any = [];
  public currentPage: number = 0;

  public cateID:any;
  
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
    this.updateScreenWidth();
  }
  
  public visible: boolean = false;
  @HostListener('window:scroll',[])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop 
    || document.body.scrollTop || 0;
    this.visible = scrollPosition > 300;
  }
  
  public screenWidth: number = 0;
  @HostListener('window:size', [])
  onResize() {
    this.updateScreenWidth();
  }
  
  ngOnInit(): void {
    
    this.loadProducts(0,8);
  }

  private loadProducts(page?:any, size?:any){
    this.productService.findAll(page,size).subscribe({
      next: (resp) => {
        this.products = resp.content.map(
          (productDTO:any) => JSON.parse(AESUtil.decrypt(productDTO.encryptedData))
        );
      },
      error(err) {console.error(err);}
    })
  }
  
  public next(){
    if(!this.isNext){
      this.currentPage++;
      this.loadProducts(this.currentPage,8);
    }
  }

  public prev(){
    if(!this.isPrev){
      this.currentPage--;
      this.loadProducts(this.currentPage,8);
    }
  }

  private updateScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  public viewProductDetail(item:any){
    this.router.navigate(['/san-pham/mo-ta-chi-tiet'], { 
      state: { data: item }
    });
  }
}