import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BodyComponent } from '../components/body/body.component';
import { Location } from '@angular/common';
import { AdminComponent } from '../components/admin/admin.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AdminComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {
      
  }

  public path():any {
    const path = this.location.path().split("/");

    return path[path.length - 1];
  }
}
