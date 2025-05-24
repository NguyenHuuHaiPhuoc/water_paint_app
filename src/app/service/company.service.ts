import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class CompanyService{
    private api_url = 'https://hdchemicals.vn:8444/api';

    constructor(
        private http: HttpClient
    ){}


    public findCompanies():Observable<any>{
        return this.http.get<any>(this.api_url+'/find/company');
    }

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.api_url+'/create/company', req);
    }

    public update(req:any):Observable<any> {
        return this.http.put<any>(this.api_url+'/update/company', req);
    }
}