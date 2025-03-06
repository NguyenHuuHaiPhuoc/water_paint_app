import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    RouterOutlet
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

    public path():string {
        const path = this.location.path();
        return path;
    }
}