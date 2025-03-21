import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleService{
    private apiURL = "http://localhost:8080/api";

    constructor(
        private http: HttpClient
    ){}

    public findRole():Observable<any> {
        return this.http.get<any>(this.apiURL+"/find/role");
    }
}