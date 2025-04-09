import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../../service/categori.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  providers: [
    CategoriService,
    ProductService
  ]
})
export class ProductItemComponent implements OnInit{
 public title:any;

 public listProduct:any;
 public listProductByCateID:any;
 private category:any;

 constructor(
  private localtion: Location,
  private cateService: CategoriService,
  private productService: ProductService
) {}

  ngOnInit(): void {
    const path = this.localtion.path().split("/");

    if(path[path.length -1]){
      this.cateService.findByIdCategoryLV2(path[path.length -1]).subscribe({
        next: (resp) => {
          if(resp.status == 201 && !resp.result.is_del){
            this.category = resp.result;
            this.title = this.category.name;
          }
        },
        error(err) {console.error(err);}
      });
      
      this.loadProductByCateID(path[path.length -1]);
    }
  }

  private loadProduct(){
    
  }

  private loadProductByCateID(id:any){
    this.productService.findProductByCateID(id).subscribe({
      next: (resp) => {
        if(resp.status == 201){
          this.listProductByCateID = resp.listResult.filter((item:any) => !item.is_del);
        }
      },
      error(err){console.error(err);}
    })
  }
}