import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProductService{

    private apiURL =  'http://localhost:8080/api';

    constructor(
        private http: HttpClient
    ){}

    public findAll():Observable<any> {
        return this.http.get<any>(this.apiURL + '/find/products');
    }

    public findProductByCateID(id:any):Observable<any> {
        return this.http.get<any>(this.apiURL + `/find/product/by/category/${id}`);
    }

    public findById(id:any):Observable<any> {
        return this.http.post<any>(this.apiURL+'/find/detail/byID', id);
    }

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.apiURL+'/create/product',req);
    }

    public update(req:any):Observable<any> {
        return this.http.put<any>(this.apiURL+'/update/product',req);
    }

    public delete(req:any):Observable<any>{
        return this.http.patch<any>(this.apiURL + '/delete/product',req);
    }

    public createDetail(req:any):Observable<any> {
        return this.http.post<any>(this.apiURL + "/create/detail", req);
    }

    public updateDetail(req:any):Observable<any> {
        return this.http.put<any>(this.apiURL + "/update/detail", req);
    }
}