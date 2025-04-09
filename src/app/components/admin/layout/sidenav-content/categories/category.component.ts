import { Component, OnInit } from '@angular/core';
import { CategoriService } from '../../../../../service/categori.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

declare var $: any;
@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [CategoriService],
})
export class CategoryComponent implements OnInit {
  public listCatelogLV1Filter: any = [];
  public listCatelogLV2:any = [];
  private account: any;
  private category:any;

  public formAddCatelog: FormGroup;

  constructor(
    private catelogService: CategoriService,
    private fb: FormBuilder
  ) {
    this.formAddCatelog = this.fb.group({
      name: [null],
      level: [1],
      type: ['NO'],
    });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '19rem',
    minHeight: '5rem',
    translate: 'yes',
    defaultParagraphSeparator: 'div',
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: 'Times new Roman',
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  ngOnInit(): void {
    this.loadData();
    // $('#typeCatelog').attr('disabled', 'true');
    const accountConvert = localStorage.getItem('account');
    if (accountConvert) this.account = JSON.parse(accountConvert);
  }

  private loadData() {
    this.catelogService.findAllCatelogLV1().subscribe({
      next: (resp) => {
        if (resp.status == 201) {
          this.listCatelogLV1Filter = resp.listResult.filter((item:any) => !item.is_del);
          // console.log(this.listCatelogLV1Filter);
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  public selectCateLV() {
    if (this.formAddCatelog.value.level == 2) {
      $('#typeCatelog').removeAttr('disabled');
    } else $('#typeCatelog').attr('disabled', 'true');
  }

  public findCatelogLV2(cate:any){
    if(cate){
      const req = {
        id: cate.id
      }
      this.catelogService.findByCateID(req).subscribe({
        next: (resp) => {
          if(resp.status == 201){
            this.listCatelogLV2 = resp.listResult;
          }
        },
        error(err) {
            console.error(err);
        },
      });

      this.viewCategory(cate);
    }
  }

  public createCatelog() {
    if (this.formAddCatelog.get('level')?.value == 1) {
      const req = {
        name: this.formAddCatelog.value.name,
        is_del: 'False',
        create_by: this.account.id,
        cate_type: this.formAddCatelog.get('level')?.value
      };
      this.catelogService.createCattelogLV1(req).subscribe({
        next: (resp) => {
          if (resp.status == 201) {
            Swal.fire({
              title: resp.message,
              icon: 'success',
              draggable: true,
            });
            this.loadData();
          } else {
            Swal.fire({
              title: resp.message,
              icon: 'warning',
              draggable: true,
            });
          }
        },
        error(err) {
          console.error(err);
        },
      });
    }

    if(this.formAddCatelog.get('level')?.value == 2){
      const req = {
        name: this.formAddCatelog.value.name,
        is_del: 'False',
        create_by: this.account.id,
        categoryLV1: {
          id: this.formAddCatelog.value.type
        },
        cate_type: this.formAddCatelog.get('level')?.value
      }
      this.catelogService.createCattelogLV2(req).subscribe({
        next: (resp) => {
          if(resp.status == 201){
            Swal.fire({
              title: resp.message,
              icon: 'success',
              draggable: true,
            });
            this.loadData();
          } else {
            Swal.fire({
              title: resp.message,
              icon: 'warning',
              draggable: true,
            });
          }
        },
        error(err) {
            console.error(err);
        },
      })
    }
  }

  public formatDate(date:any){
    return moment(date).format('DD/MM/YYYY');
  }

  public viewCategory(item:any){
    if(item){
      this.category = item;
      $('#cate_name').val(item.name);
      $('#cate_level').val((item.cate_type == 1)?'Danh mục cấp 1':'Danh mục cấp 2');
    }
  }

  public update(){
    const cate_level = $('#cate_level').val().split(" ");
    const cate_name = $('#cate_name').val();
    
    if(cate_name != null && cate_name != ''){
      if(this.category.cate_type == 1){
        const req = {
          id:this.category.id,
          name: cate_name,
          is_del: this.category.is_del,
          create_by: this.category.create_by,
          cate_type: this.category.cate_type
        }
        this.catelogService.updateCattelogLV1(req).subscribe({
          next: (resp) => {
            if(resp.status == 201){
              Swal.fire({
                title: resp.message,
                icon: 'success',
                draggable: true,
              });
              this.loadData();
            }
            
            if(resp.status == 401){
              Swal.fire({
                title: resp.message,
                icon: 'error',
                draggable: true,
              });
            }
          },
          error(err) {
              console.error(err);
          }
        });
      }
      if(this.category.cate_type == 2){
        const req = {
          id: this.category.id,
          name: cate_name,
          is_del: this.category.is_del,
          create_by: this.category.create_by,
          categoryLV1: {
            id: this.category.categoryLV1.id
          },
          cate_type: this.category.cate_type
        }
        this.catelogService.updateCattelogLV2(req).subscribe({
          next: (resp) => {
            if(resp.status == 201){
              Swal.fire({
                title: resp.message,
                icon: 'success',
                draggable: true,
              });
            }
            
            if(resp.status == 401){
              Swal.fire({
                title: resp.message,
                icon: 'error',
                draggable: true,
              });
            }
          },
          error(err) {
              console.error(err);
          }
        });
      }
    }
  }

  public delete(){

    if(this.category){
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
        cancelButtonText: "Hủy"
      }).then((result) => {
        if (result.isConfirmed) {
          
          const req = {
            id : this.category.id,
            cate_type: this.category.cate_type
          }
      
          this.catelogService.delete(req).subscribe({
            next: (resp) => {
              if(resp.status == 201){
                Swal.fire({
                  title: resp.message,
                  icon: 'success',
                  draggable: true,
                });

                this.loadData();
              }
              
              if(resp.status == 401){
                Swal.fire({
                  title: resp.message,
                  icon: 'error',
                  draggable: true,
                });
              }
            },
            error(err) {
              console.error(err);
            }
          });
        }
      });
    }
  }

  public reset(){
    $('#cate_name').val(null);
    $('#cate_level').val(null);
  }
}
