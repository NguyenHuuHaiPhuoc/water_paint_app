import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../service/product.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriService } from '../../../../../service/categori.service';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { UploadImage } from '../../../../../service/uploadImage.service';
import { Router } from '@angular/router';
import { selectValidator } from '../../../../../validators/selectValidator';

declare var $: any;
@Component({
  selector: 'app-product-manager',
  imports: [FormsModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss',
  providers: [ProductService, CategoriService, UploadImage],
})
export class ProductManagerComponent implements OnInit {
  public formProduct: FormGroup;
  public listCatelog1: any;
  public listCatelog2: any;
  public lisProductFiter: any;
  public lisProduct: any;
  public account: any;
  public imgAddProduct: any = null;
  public imgReview: any;
  private imgUpload: any;
  public product:any = {};

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoriService,
    private uploadService: UploadImage,
    private router : Router
  ) {
    this.formProduct = this.fb.group({
      name: [null, Validators.required],
      chemical: [null, Validators.required],
      cateLV1: ['', Validators.required],
      cateLV2: ['', Validators.required],
      description: [null, Validators.required],
      info: [null, Validators.required],
      application: [null, Validators.required],
      quantity: [null],
      production_date: [null],
      weights: [null]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadProduct();
    const accountConvert = localStorage.getItem('account');
    if (accountConvert) this.account = JSON.parse(accountConvert);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    translate: 'yes',
    defaultParagraphSeparator: 'div',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'Times new Roman',
  };

  public loadData() {
    this.categoryService.findAllCatelogLV1().subscribe({
      next: (resp) => {
        if (resp.status == 201) {
          this.listCatelog1 = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  private loadProduct() {
    this.productService.findAll().subscribe({
      next: (resp) => {
        if (resp.status == 201) {
          this.lisProductFiter = resp.listResult;
          this.lisProduct = resp.listResult;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public create() {
    const req = {
      name: this.formProduct.get('name')?.value,
      chemical: this.formProduct.get('chemical')?.value,
      description: this.formProduct.get('description')?.value,
      quantity: this.formProduct.get('quantity')?.value,
      create_by: this.account.id,
      is_del: 'False',
      categoryLV2: {
        id: $('#catelog2').val(),
      },
      production_date: this.formProduct.get("production_date")?.value,
      weights: this.formProduct.get("weights")?.value
    };

    this.productService.create(req).subscribe({
      next: (resp) => {
        if (resp.status == 201) {
          this.createDetail(resp.result.id);
        }
        if (resp.status == 401) {
          Swal.fire({
            title: resp.message,
            icon: 'error',
            draggable: true,
          });
          return;
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  private async createDetail(productID: any) {
    if (this.imgUpload) {
      this.uploadService
        .uploadFile('water_paint/product/image', this.imgUpload)
        .subscribe(
          (url) => {
            console.log(url);
            if (url) {
              const req = {
                intro_product: this.formProduct.get('info')?.value,
                applications: this.formProduct.get('application')?.value,
                product: {
                  id: productID,
                },
                img: url,
              };

              this.productService.createDetail(req).subscribe({
                next: (resp) => {
                  if (resp.status == 201) {
                    Swal.fire({
                        title: resp.message,
                        icon: 'success',
                        draggable: true,
                      });  
                    this.loadProduct();
                  }

                  if (resp.status == 401) {
                    Swal.fire({
                      title: resp.message,
                      icon: 'error',
                      draggable: true,
                    });
                  }
                },
                error(err) {
                  console.error(err);
                },
              });
            }
          },
          (error) => {
            console.error(error);
          }
        );
    } else{
        const req = {
            intro_product: this.formProduct.get('info')?.value,
            applications: this.formProduct.get('application')?.value,
            product: {
              id: productID,
            },
            img: null,
          };

          this.productService.createDetail(req).subscribe({
            next: (resp) => {
              if (resp.status == 201) {
                Swal.fire({
                    title: resp.message,
                    icon: 'success',
                    draggable: true,
                  });  
                this.loadProduct();
              }

              if (resp.status == 401) {
                Swal.fire({
                  title: resp.message,
                  icon: 'error',
                  draggable: true,
                });
              }
            },
            error(err) {
              console.error(err);
            },
          });
    }
    this.resetForm();
    $('#close-form').trigger('click');
  }

  public viewCatelog2(e: Event) {
    const idCate = (e.target as HTMLSelectElement).value;

    if (idCate !== 'NO') {
      const req = {
        id: idCate,
      };
      this.categoryService.findByCateID(req).subscribe({
        next: (resp) => {
          if (resp.status == 201) {
            this.listCatelog2 = resp.listResult;
          }
        },
        error(err) {
          console.error(err);
        },
      });
    } else {
      $('#catelog2').val('NO');
      this.listCatelog2 = [];
    }
  }

  public chooseImgAddProduct(e: any) {
    const file = e.target.files;

    if (file && file[0]) {
      const reader = new FileReader();
      reader.onload = (f: any) => (this.imgAddProduct = f.target.result);
      reader.readAsDataURL(file[0]);
      this.imgUpload = file[0];
    } else {
      this.imgAddProduct = null;
      this.imgUpload = null;
    }
  }
  
  public resetForm(){
    this.formProduct.setValue({
        name: '',
        chemical: '',
        cateLV1: '',
        cateLV2: '',
        description: '',
        info: '',
        application: '',
        quantity: '',
        production_date: '',
        weights: ''
    });
    this.imgAddProduct = null;
  }

  public viewProductDetail(item:any){
    if(item){
      this.router.navigate(['admin/quan-ly-san-pham/chi-tiet'], {state: {item}});
    }
  }

  public searchProduct(e: Event){
    const value = (e.target as HTMLInputElement).value;

    this.lisProductFiter = this.lisProduct.filter((item:any) => {
      return JSON.stringify(item.name.toLowerCase()).includes(value.toLowerCase());
    });
  }
}
