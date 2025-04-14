import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InfoContactService{

    private api_url = "http://localhost:8080/api";

    constructor(private http: HttpClient){}

    public findAllInfoContact():Observable<any>{
        return this.http.get<any>(this.api_url+'/find/infocontacts');
    }

    public create(req:any):Observable<any> {
        return this.http.post<any>(this.api_url+'/create/infocontact',req);
    }

    public update(req:any):Observable<any> {
        return this.http.put<any>(this.api_url+'/update/infocontact',req);
    }
}