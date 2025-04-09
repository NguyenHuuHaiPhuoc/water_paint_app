import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
declare var $:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  carouselItems = [
    {
      image: 'assets/imgs/tieu-chi-su-dung-phu-gia-2.jpg',
      alt: 'phụ gia',
      title: 'phụ gia trong sản xuất sơn nước'
    },
    {
      image: 'assets/imgs/tm-719c-1.jpg',
      alt: 'chất lượng',
      title: 'quy trình in và các tiêu chí đánh giá chất lượng'
    },
    {
      image: 'assets/imgs/uv-curing.jpg',
      alt: 'UV',
      title: 'các yếu tố ảnh hưởng đến tính đóng rắn của UV'
    },
    {
      image: 'assets/imgs/products/violet-jf-v.webp',
      alt: 'img',
      title: 'Mực in vải'
    },
    {
      image: 'assets/imgs/products/violet-jf-v.webp',
      alt: '',
      title: 'Mực in vải'
    },
    {
      image: 'assets/imgs/products/violet-jf-v.webp',
      alt: 'Moon',
      title: 'Mực in vải'
    }
  ];
  products = [
    {
      image: 'assets/imgs/products/tetrachloroerhylene_grade.png',
      alt: 'phụ gia',
      title: '<< Xem thêm >>'
    },
    {
      image: 'assets/imgs/tm-719c-1.jpg',
      alt: 'chất lượng',
      title: 'quy trình in và các tiêu chí đánh giá chất lượng'
    },
    {
      image: 'assets/imgs/uv-curing.jpg',
      alt: 'UV',
      title: 'các yếu tố ảnh hưởng đến tính đóng rắn của UV'
    },
    {
      image: 'assets/imgs/products/keo-vae.jpg',
      alt: 'img',
      title: 'Mực in vải'
    },
    {
      image: 'assets/imgs/products/violet-jf-v.webp',
      alt: '',
      title: 'Mực in vải'
    },
    {
      image: 'assets/imgs/products/tetrachloroerhylene_grade.png',
      alt: 'Moon',
      title: 'Mực in vải'
    }
  ];

  // private prev!: HTMLElement;
  // private next!: HTMLElement;
  // private carouselVp!: HTMLElement;
  // private cCarouselInner!: HTMLElement;
  // private leftValue: number = 0;
  // private carouselInnerWidth!: number;
  // private totalMovementSize!: number;
  // private oldViewportWidth: number = window.innerWidth;

  ngAfterViewInit(): void {
    // this.prev = document.getElementById('prev')!;
    // this.next = document.getElementById('next')!;
    // this.carouselVp = document.getElementById('carousel-vp')!;
    // const cCarouselInner = document.getElementById("");
    // // this.cCarouselInner = document.getElementById('cCarousel-inner')!;
    
    // if(cCarouselInner){
    //   this.carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;
    //   console.log(this.carouselInnerWidth);
      

    //   const itemWidth = document.querySelector('.cCarousel-item')?.getBoundingClientRect().width || 0;
    //   const gap = parseFloat(
    //     window.getComputedStyle(cCarouselInner).getPropertyValue('gap') || '0'
    //   );
    //   this.totalMovementSize = itemWidth + gap;
  
    //   this.prev.addEventListener('click', () => this.handlePrevClick());
    //   this.next.addEventListener('click', () => this.handleNextClick());
    // }
  }

  // private handlePrevClick(): void {
  //   console.log(2);
  //   if (this.leftValue !== 0) {
  //     this.leftValue += this.totalMovementSize;
  //     this.cCarouselInner.style.left = `${this.leftValue}px`;
  //   }
  // }

  // private handleNextClick(): void {
  //   const carouselVpWidth = this.carouselVp.getBoundingClientRect().width;
  //   if (this.carouselInnerWidth - Math.abs(this.leftValue) > carouselVpWidth) {
  //     this.leftValue -= this.totalMovementSize;
  //     this.cCarouselInner.style.left = `${this.leftValue}px`;
  //   }
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   this.mediaManagement();
  // }

  // private mediaManagement(): void {
  //   const newViewportWidth = window.innerWidth;

  //   if (this.leftValue <= -this.totalMovementSize && this.oldViewportWidth < newViewportWidth) {
  //     this.leftValue += this.totalMovementSize;
  //     this.cCarouselInner.style.left = `${this.leftValue}px`;
  //     this.oldViewportWidth = newViewportWidth;
  //   } else if (this.leftValue <= -this.totalMovementSize && this.oldViewportWidth > newViewportWidth) {
  //     this.leftValue -= this.totalMovementSize;
  //     this.cCarouselInner.style.left = `${this.leftValue}px`;
  //     this.oldViewportWidth = newViewportWidth;
  //   }
  // }
}