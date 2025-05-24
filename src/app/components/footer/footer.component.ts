import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../service/categori.service';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [
    CategoriService,
    CompanyService
  ]
})
export class FooterComponent implements OnInit{
  public catelogs:any = [];
  public company:any;

  constructor(
    private catelogService: CategoriService,
    private companyservice: CompanyService
  ){}

  ngOnInit(): void {
      // this.loadCatelog();
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
    });

    this.companyservice.findCompanies().subscribe({
      next: (resp) => {
        if(resp.status == 201){
            this.company = resp.listResult[0];
        }
      },
      error(err){
          console.error(err);
      }
    });
  }
}