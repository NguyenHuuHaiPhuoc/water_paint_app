import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InfoContactService{

    private api_url = "https://hdchemicals.vn:8443/api";

    constructor(private http: HttpClient){}

    public findAllInfoContact(page?:any, size?:any):Observable<any>{
        const currentPage = page !== undefined ? '?page='+page : '';
        const sizePage = size !== undefined ? '&size='+size : '';
        return this.http.get<any>(this.api_url+'/find/infocontacts'+currentPage+sizePage);
    }

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.api_url+'/create/infocontact',req);
    }

    public update(req:any):Observable<any> {
        return this.http.put<any>(this.api_url+'/update/infocontact',req);
    }
}