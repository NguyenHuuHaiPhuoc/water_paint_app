import { AfterViewInit, Component, Input } from "@angular/core";

@Component({
    selector: 'app-carousel',
    imports: [],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    providers: []
})

export class CarouselComponent implements AfterViewInit{
    
    @Input() items:any = [];
    @Input() visibleItems:number = 3;
    leftValue: number = 0;
    totalMovementSize: number = 0;

    constructor(){}
    
    ngAfterViewInit(): void {
        setTimeout(() => {
            const carouselItem = document.querySelector(".cCarousel-item");
            const cCarouselInner = document.querySelector("#cCarousel-inner");
        
            if (carouselItem && cCarouselInner) {
                const itemWidth = (carouselItem as HTMLElement).getBoundingClientRect().width;
                const gap = parseFloat(window.getComputedStyle(cCarouselInner as HTMLElement).getPropertyValue('gap')) || 0;
                this.totalMovementSize = itemWidth + gap;
            }
        });
    }

    public prev() {
        if (this.leftValue < 0) {
            this.leftValue += this.totalMovementSize;
        }
    }

    public next() {
        const carouselVpWidth = document.querySelector("#carousel-vp")?.getBoundingClientRect().width || 0;
        const cCarouselInnerWidth = document.querySelector("#cCarousel-inner")?.getBoundingClientRect().width || 0;
    
        if (cCarouselInnerWidth - Math.abs(this.leftValue) > carouselVpWidth) {
          this.leftValue -= this.totalMovementSize;
        }
    }
}