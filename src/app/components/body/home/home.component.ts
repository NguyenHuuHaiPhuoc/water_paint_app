import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductService } from '../../../service/product.service';
declare var $:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    ProductService,
  ]
})
export class HomeComponent implements AfterViewInit{

  carouselItems = [
    {
      img: 'assets/imgs/tieu-chi-su-dung-phu-gia-2.jpg',
      alt: 'phụ gia',
      name: 'phụ gia trong sản xuất sơn nước'
    },
    {
      img: 'assets/imgs/tm-719c-1.jpg',
      alt: 'chất lượng',
      name: 'quy trình in và các tiêu chí đánh giá chất lượng'
    },
    {
      img: 'assets/imgs/uv-curing.jpg',
      alt: 'UV',
      name: 'các yếu tố ảnh hưởng đến tính đóng rắn của UV'
    },
    {
      img: 'assets/imgs/products/violet-jf-v.webp',
      alt: 'img',
      name: 'Mực in vải'
    },
    {
      img: 'assets/imgs/products/violet-jf-v.webp',
      alt: '',
      name: 'Mực in vải'
    },
    {
      img: 'assets/imgs/products/violet-jf-v.webp',
      alt: 'Moon',
      name: 'Mực in vải'
    }
  ];
  products:any = [];

  constructor(
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    this.productService.findAll().subscribe({
      next : (resp) => {
        if(resp.status == 201) {
          this.products = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      }
    })
  }
}