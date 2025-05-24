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
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AESUtil } from '../../../../../util/aesUtil';
// import * as CryptoJS from 'crypto-js';

declare var $: any;
@Component({
  selector: 'app-product-manager',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.scss',
  providers: [ProductService, CategoriService, UploadImage],
})
export class ProductManagerComponent implements OnInit {
  public formProduct: FormGroup;
  public listCatelog1: any;
  public listCatelog2: any;
  public lisProductFiter: any;
  public listProductSearch: any;
  public account: any;
  public imgAddProduct: any = null;
  public imgReview: any;
  private imgUpload: any;
  public product:any = {};
  public currentPage: number = 0;
  public pageSize: number = 4;
  public totalItems: number = 0;
  public totalPages:number = 0;
  public isPrevDisabled:any;
  public isNextDisabled:any;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoriService,
    private uploadService: UploadImage,
    private router : Router
  ) {
    this.formProduct = this.fb.group({
      name: [null, Validators.required],
      chemical: [null],
      cateLV1: ['', Validators.required],
      cateLV2: ['', Validators.required],
      description: [null, Validators.required],
      intro_product: [null, Validators.required],
      application: [null, Validators.required],
      quantity: [null],
      production_date: [null],
      weights: [null],
      paths: '/san-pham-chi-tiet/'
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadProduct();
    const accountConvert = sessionStorage.getItem('id_token_claims_obj');
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
          this.listCatelog1 = resp.listResult.map(
            (item:any) => JSON.parse(AESUtil.decrypt(item.encryptedData))
          );
        }
      },
      error(err) {
        console.error(err);
      },
    });

  }

  private loadProduct(page?:any, size?:any) {
    this.productService.findAll(page,size).subscribe({
      next: (resp) => {
        this.lisProductFiter = resp.content.map(
          (productDTO:any) => JSON.parse(AESUtil.decrypt(productDTO.encryptedData))
        );
        this.totalItems = resp.totalElements;
        this.isNextDisabled = resp.last;
        this.isPrevDisabled = resp.first;
        this.totalPages = resp.totalPages;
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public async create() {
    const req = {
      name: this.formProduct.get('name')?.value,
      lot_number: this.formProduct.get('chemical')?.value,
      description: this.formProduct.get('description')?.value,
      quantity: this.formProduct.get('quantity')?.value,
      create_by: this.account.id,
      is_del: 'False',
      categoryLV2: {
        id: $('#catelog2').val(),
      },
      production_date: this.formProduct.get("production_date")?.value,
      weights: this.formProduct.get("weights")?.value,
      intro_product: this.formProduct.get('intro_product')?.value,
      applications: this.formProduct.get('application')?.value,
      img: 'NULL',
      paths: this.formProduct.value.paths
    };

    if (this.imgUpload) {
      this.uploadService
      .uploadFile('water_paint/product/image', this.imgUpload)
      .subscribe(
        (url) => {
          if (url) {
            req.img = url.toString();
            this.productService.create(req).subscribe({
              next: (resp) => {
                if (resp.status == 201) {
                  Swal.fire({
                    title: resp.message,
                    icon: 'success',
                    draggable: true,
                  });
                  this.loadProduct(this.currentPage,this.pageSize);
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
          },
          (error) => {
            console.error(error);
          }
        );
    } else{
          this.productService.create(req).subscribe({
            next: (resp) => {
              if (resp.status == 201) {
                Swal.fire({
                    title: resp.message,
                    icon: 'success',
                    draggable: true,
                  });  
                this.loadProduct(this.currentPage,this.pageSize);
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

  public delete(idItem:any){
    if(idItem){
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy"
      }).then((result) => {
        if (result.isConfirmed) {
          const req= {
            id: idItem
          }
          this.productService.delete(req).subscribe({
            next: (resp) => {
              if(resp.status == 201){
                Swal.fire({
                  title: resp.message,
                  icon: "success"
                });
                this.loadProduct(this.currentPage,this.pageSize);
              }
              if(resp.status == 401){
                Swal.fire({
                  title: resp.message,
                  icon: "error"
                });
              }
            },
            error(err) {console.error(err);}
          });
          
        }
      });
    }
  }

  public viewCatelog2(e: Event) {
    const idCate = (e.target as HTMLSelectElement).value;

    if (idCate !== 'NO') {
      this.categoryService.findByCateID(idCate).subscribe({
        next: (resp) => {
          if (resp.status == 201) {
            this.listCatelog2 = resp.listResult.map(
              (item:any) => JSON.parse(AESUtil.decrypt(item.encryptedData))
            )
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
        intro_product: '',
        application: '',
        quantity: '',
        production_date: '',
        weights: '',
        paths: ''
    });
    this.imgAddProduct = null;
  }

  public viewProductDetail(item:any){
    if(item){
      this.router.navigate(['admin/quan-ly-san-pham/chi-tiet'], {state: {item}});
    }
  }

  private timeout:any = null;
  public searchProduct(e: Event){
    const value = (e.target as HTMLInputElement).value;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.productService.searchProduct(value).subscribe({
        next: (resp) => {
          this.listProductSearch = resp.map(
              (item:any) => JSON.parse(AESUtil.decrypt(item.encryptedData))
            );
        },
        error(err) {console.error(err);}
      })
    }, 1000);
  }

  public pagination(action:any){
    switch (action) {
      case 'prev':
        if (this.currentPage > 0) {
          this.currentPage--;
          this.loadProduct(this.currentPage,this.pageSize);
        }
        break;
      case 'next':
        if (!this.isNextDisabled) {
          this.currentPage++;
          this.loadProduct(this.currentPage,this.pageSize);
        }
        break;
      default:
        console.log('Unknown action.');
        break;
    }
  }
}
