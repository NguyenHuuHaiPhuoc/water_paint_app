import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleService{
    private apiURL = "https://hdchemicals.vn:8444/api";

    constructor(
        private http: HttpClient
    ){}

    public findRole(name:any):Observable<any> {
        return this.http.get<any>(this.apiURL+"/find/role?role_name="+name);
    }
}