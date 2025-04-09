import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AccountService{

    private apiUrl = 'http://localhost:8080/api';

    constructor(
        private http: HttpClient
    ){}

    public findAllAccount():Observable<any>{
        return this.http.get<any>(this.apiUrl + '/list/account');
    }

    public findByUsername(req:any):Observable<any> {
        return this.http.post<any>(this.apiUrl + '/login', req);
    }

    public create (account:any):Observable<any>{
        return this.http.post<any>(this.apiUrl + '/create/account',account);
    }

    public update(req:any):Observable<any>{
        return this.http.put<any>(this.apiUrl + '/update/account', req);
    }

    public delete(req:any):Observable<any> {
        return this.http.patch<any>(this.apiUrl + '/delete/account', req);
    }
}