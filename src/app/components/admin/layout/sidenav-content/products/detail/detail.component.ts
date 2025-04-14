import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../../service/product.service';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UploadImage } from '../../../../../../service/uploadImage.service';

declare var $: any;
@Component({
  selector: 'app-detail',
  imports: [AngularEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [
    ProductService,
    UploadImage
],
})
export class DetailComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
    minHeight: '5rem',
    translate: 'yes',
    defaultParagraphSeparator: 'div',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'Times new Roman',
  };

  private product: any;
  public formProduct: FormGroup;
  public imgReview: any;
  private imgUpload:any;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private upload: UploadImage
    ) {
    this.formProduct = this.fb.group({
      id: [null],
      name: [null],
      chemical: [null],
      description: [null],
      quantity: [null],
      create_date: [null],
      create_by: [null],
      is_del: [null],
      categoryLV2: {
        id: [null],
      },
      production_date: [null],
      weights: [null],
      intro_product: [null],
      applications: [null],
      img: [null],
      paths: [null],
    });
  }

  ngOnInit(): void {
    this.product = history.state.item;
    this.loadProduct(this.product);
  }

  public loadProduct(item:any) {
    this.formProduct.setValue({
      id: item.id,
      name: item.name,
      chemical: item.chemical,
      description: item.description,
      quantity: item.quantity,
      create_date: item.create_date,
      create_by: item.create_by,
      is_del: item.is_del,
      categoryLV2: {
        id: item.categoryLV2.id,
      },
      production_date: item.production_date,
      weights: item.weights,
      intro_product: item.intro_product,
      applications: item.applications,
      img: item.img,
      paths: item.paths,
    });

    this.imgReview = item.img;
  }

  public chooseImgUpdateProduct(e: any) {
    const file = e.target.files;

    if (file && file[0]) {
        const reader = new FileReader();
        reader.onload = (f: any) => (this.imgReview = f.target.result);
        reader.readAsDataURL(file[0]);
        this.imgUpload = file[0];
    } else {
        this.imgReview = null;
        this.imgUpload = null;
    }
  }

  public removeImage(){
    this.imgUpload = null;
    this.imgReview = null;
  }

  public update() {
    if (this.formProduct.value.id) {
    //   console.log(this.formProduct.value);
      if (this.imgUpload) {
        this.upload
        .uploadFile('water_paint/product/image', this.imgUpload).subscribe(
            (url) => {
                if(url){
                    this.formProduct.get('img')?.setValue(url);
                    this.productService.update(this.formProduct.value).subscribe({
                        next: (resp) => {
                          if (resp.status == 201) {
                            Swal.fire({
                              title: resp.message,
                              icon: 'success',
                              draggable: true,
                            });
                            this.loadProduct(resp.result);
                          }
                        },
                        error(err) {
                          console.error(err);
                        },
                    });
                }
            }
        )
      }
      else{
        this.formProduct.get('img')?.setValue(this.imgReview);
        this.productService.update(this.formProduct.value).subscribe({
            next: (resp) => {
              if (resp.status == 201) {
                Swal.fire({
                  title: resp.message,
                  icon: 'success',
                  draggable: true,
                });
                this.loadProduct(resp.result);
              }
            },
            error(err) {
              console.error(err);
            },
        });
      }
    }
  }
}
