import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorityService{

    private apiUrl = "http://localhost:8080/api";
    constructor(
        private http: HttpClient
    ){}

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.apiUrl + "/create/authority", req);
    }
}