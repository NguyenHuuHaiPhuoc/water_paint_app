import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CategoriService{
    private apiURL = 'https://hdchemicals.vn:8444/api';

    constructor(
        private http: HttpClient
    ){}

    public findAllCatelogLV1():Observable<any> {
        return this.http.get<any>(this.apiURL + '/catelog/lv1');
    }

    public findByIdCategoryLV1(id:any):Observable<any> {
        return this.http.get<any>(this.apiURL+"/findByID/catelog/lv1/"+id);
    }
    public findByIdCategoryLV2(id:any):Observable<any> {
        return this.http.get<any>(this.apiURL+"/findByID/catelog/lv2/"+id);
    }

    public findByCateID(req:any):Observable<any> {
        return this.http.get<any>(this.apiURL+"/find/catelog/lv2/by?catelog_id=" + req);
    }

    public createCattelogLV1(req:any):Observable<any> {
        return this.http.post<any>(this.apiURL + '/create/catelog/lv1', req);
    }

    public updateCattelogLV1(req:any):Observable<any> {
        return this.http.put<any>(this.apiURL + '/update/catelog/lv1', req);
    }

    public createCattelogLV2(req:any):Observable<any> {
        return this.http.post<any>(this.apiURL + '/create/catelog/lv2', req);
    }

    public updateCattelogLV2(req:any):Observable<any> {
        return this.http.put<any>(this.apiURL + '/update/catelog/lv2', req);
    }

    public delete(req:any):Observable<any> {
        return this.http.patch<any>(this.apiURL + "/delete/catelog", req);
    }
}