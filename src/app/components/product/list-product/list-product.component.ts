import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriService } from '../../../service/categori.service';

@Component({
  selector: 'app-list-product',
  imports: [
    
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  providers: [
    CategoriService
  ]
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

  public catelogLV1 :any;
  public catelogLV2s :any;

  public cateID:any;
  
  constructor(
    private localtion: Location,
    private catelogService: CategoriService
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
    
    this.cateID = this.localtion.path().split('/');
    this.cateID = this.cateID[this.cateID.length-1];

    this.loadData();

    this.catelogService.findByIdCategoryLV1(this.cateID).subscribe({
      next: (resp) =>{
        if(resp.status == 201 && !resp.result.is_del){
          this.catelogLV1 = resp.result;
        } 
      },
      error(err) {
        console.error(err);
      }
    });
  }
  
  private loadData(){
    const req = {
      id: this.cateID
    }
    this.catelogService.findByCateID(req).subscribe({
      next: (resp) => {
        if(resp.status == 201){
          this.catelogLV2s = resp.listResult;
        }
      },
      error(err){
        console.error(err);
      }
    });
  }
  

  private updateScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  public getPath():string {
    const url = this.localtion.path();
    const path = url.split("/");
    return path[path.length-1].toLocaleLowerCase();
  }
}