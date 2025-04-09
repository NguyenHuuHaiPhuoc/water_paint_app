import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../service/categori.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [
    CategoriService
  ]
})
export class FooterComponent implements OnInit{
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
          this.catelogs = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      }
    })
  }
}