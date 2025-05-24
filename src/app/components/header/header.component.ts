import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../service/categori.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: []
})
export class HeaderComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
  }
}
