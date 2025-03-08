import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from '../back_to_top/back-to-top.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    RouterOutlet,
    BackToTopComponent
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  
    constructor(
        private location: Location
    ){}

    ngOninit() {

    }

    public path() {
        const path = this.location.path().split("/");
        return path[path.length -1];
    }
}