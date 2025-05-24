import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorityService{

    private apiUrl = "https://hdchemicals.vn:8444/api";
    constructor(
        private http: HttpClient
    ){}

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.apiUrl + "/create/authority", req);
    }

    public roleByAccount(accountID?:any):Observable<any>{
        const currentPage = accountID !== undefined ? '?accountID='+accountID : '';
        return this.http.get<any>(this.apiUrl + "/find/auth/" + accountID);
    }

    public update(req:any):Observable<any> {
        return this.http.patch<any>(this.apiUrl+"/update/authority", req);
    }
}