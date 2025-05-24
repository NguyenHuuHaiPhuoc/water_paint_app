import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProductService{

    private apiURL =  'https://hdchemicals.vn:8444/api';

    constructor(
        private http: HttpClient
    ){}

    public findAll(page?:any,size?:any):Observable<any> {
        const currentPage = page !== undefined ? '?page='+page : '';
        const sizePage = size !== undefined ? '&size='+size : '';
        return this.http.get<any>(this.apiURL + '/find/products' + currentPage + sizePage);
    }

    public searchProduct(value:string):Observable<any> {
        return this.http.get<any>(this.apiURL + '/search/product?search=' + value)
    }

    // public findProductByCateID(id:any):Observable<any> {
    //     return this.http.get<any>(this.apiURL + `/find/product/by/category/${id}`);
    // }

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.apiURL+'/create/product',req);
    }

    public update(req:any):Observable<any> {
        return this.http.put<any>(this.apiURL+'/update/product',req);
    }

    public delete(req:any):Observable<any>{
        return this.http.patch<any>(this.apiURL + '/delete/product',req);
    }
}