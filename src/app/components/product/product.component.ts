import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriService } from '../../service/categori.service';

@Component({
  selector: 'app-product',
  imports: [RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [
    CategoriService
  ]
})
export class ProductComponent implements OnInit{
  
  public listProduct = [];
  public listCategoryLV1s:any = [];
  public listCategoryLV2s:any = [];

  constructor(
    private localtion: Location,
    private cateService: CategoriService
  ) {}

  ngOnInit(): void {
      this.loadCategory();
      const cateID = this.localtion.path().split("/");
      if(localStorage.getItem('cateID') == null){
        localStorage.setItem('cateID',cateID[cateID.length-1]);
      }
      this.loadCategoryByID(localStorage.getItem('cateID'));
  }

  public loadCategory(){
    this.cateService.findAllCatelogLV1().subscribe({
      next: (resp) => {
        if(resp.status == 201){
          this.listCategoryLV1s = resp.listResult.filter((item:any) => !item.is_del);
        }
      },
      error(err) {
        console.error(err);
      }
    })
  }

  public loadCategoryByID(cateID:any){
    const req = {
      id: cateID
    }
    this.cateService.findByCateID(req).subscribe({
      next: (resp) => {
        if(resp.status == 201){
          this.listCategoryLV2s =resp.listResult.filter((item:any) => !item.is_del);
        }
      },
      error(err){console.error(err);}
    });
  }

  public getPath():string {
    const path = this.localtion.path().split("/");
    return path[path.length-1];
  }
}
