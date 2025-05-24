import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AccountService{

    private apiUrl = 'https://hdchemicals.vn:8443/api';

    constructor(
        private http: HttpClient
    ){}

    public findAllAccount():Observable<any>{
        return this.http.get<any>(this.apiUrl + '/list/account');
    }

    public searchUser(key:any):Observable<any>{
        return this.http.get<any>(this.apiUrl+"/account/search?key="+key);
    }

    public findByUsername(req:any):Observable<any> {
        return this.http.post<any>(this.apiUrl + '/login', req);
    }

    public loginWithOauth(req:any):Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login/oauth`,req);
    }

    public create (account:any):Observable<any>{
        return this.http.post<any>(this.apiUrl + '/create/account',account);
    }

    public update(req:any):Observable<any>{
        return this.http.put<any>(this.apiUrl + '/update/account', req);
    }

    public updatePass(req:any):Observable<any>{
        return this.http.post<any>(this.apiUrl + '/change/pass', req);
    }

    public forgotPass(req:any):Observable<any>{
        return this.http.post<any>(this.apiUrl + '/forgot/pass', req);
    }

    public delete(req:any):Observable<any> {
        return this.http.patch<any>(this.apiUrl + '/delete/account', req);
    }
}