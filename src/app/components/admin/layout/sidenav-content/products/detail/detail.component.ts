import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../../../../../service/product.service";
import { AngularEditorConfig, AngularEditorModule } from "@kolkov/angular-editor";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

declare var $:any;
@Component({
    selector: 'app-detail',
    imports: [
        AngularEditorModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss',
    providers: [
        ProductService
    ]
})

export class DetailComponent implements OnInit{

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
    
    private product:any;
    private detail:any;
    public formProduct: FormGroup;
    public formDetail: FormGroup;
    public imgReview:any;

    constructor(
        private router: Router,
        private productService: ProductService,
        private fb: FormBuilder
    ){
        this.formProduct = this.fb.group({
            id: [null],
            name: [null],
            chemical: [null],
            description: [null],
            quantity: [null],
            production_date: [null],
            weights: [null]
        });

        this.formDetail = fb.group({
            id: [null],
            intro_product: [null],
            applications: [null],
            create_date: [null],
            img: [null]
        });
    }

    ngOnInit(): void {
        this.product = history.state.item;
        this.loadProductDetail();
    }

    public loadProductDetail(){
        this.formProduct.setValue({
            id: this.product.id,
            name: this.product.name,
            chemical: this.product.chemical,
            description: this.product.description,
            quantity: this.product.quantity,
            production_date: this.product.production_date,
            weights: this.product.weights
        });
        $('#description').val(this.product.description);
        
        const req = {
            productID: this.product.id
        }
        this.productService.findById(req).subscribe({
            next: (resp) => {
                if(resp.status == 201){
                    this.detail = resp.result;
                    this.formDetail.setValue({
                        id: this.detail.id,
                        intro_product: this.detail.intro_product,
                        applications: this.detail.applications,
                        create_date: this.detail.create_date,
                        img: this.detail.img
                    });
                    this.imgReview = this.detail.img;
                }
            },
            error(err) {
                console.error(err);
            }
        });
    }

    public chooseImgUpdateProduct(e: any) {
        const file = e.target.files;
    
        if (file && file[0]) {
          const reader = new FileReader();
          reader.onload = (f: any) => (this.imgReview = f.target.result);
          reader.readAsDataURL(file[0]);
        //   this.imgUpload = file[0];
        } else {
          this.imgReview = null;
        //   this.imgUpload = null;
        }
      }
}