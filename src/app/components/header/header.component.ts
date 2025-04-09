import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../service/categori.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [
    CategoriService
  ]
})
export class HeaderComponent implements OnInit{
  public catelogs:any = [];

  constructor(
    private catelogService: CategoriService
  ){}

  ngOnInit(): void {
      this.loadCatelog();
  }

  private loadCatelog(){
    this.catelogService.findAllCatelogLV1().subscribe({
      next: (resp) => {
        if(resp.status == 201){
          this.catelogs = resp.listResult.filter((item:any) => !item.is_del);
        }
      },
      error(err) {
        console.error(err);
      }
    })
  }
}
