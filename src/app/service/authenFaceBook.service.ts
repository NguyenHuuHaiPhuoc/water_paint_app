import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

declare var FB: any;
@Injectable()
export class FaceBookService{
	constructor() {}

	// Kiểm tra trạng thái đăng nhập
	 getLoginStatus(): Promise<any> {
	    return new Promise((resolve) => {
	        FB.getLoginStatus((response: any) => resolve(response));
	    });
	 }

	get accessToken(){
		return FB.getAuthResponse()?.accessToken;
	}

	// Lấy thông tin người dùng
	getUserProfile() {
    const accessToken = this.accessToken;
    return fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
	}


	// Đăng xuất khỏi Facebook
	logout(): Promise<void> {
	    return new Promise((resolve) => {
	      	FB.logout(() => {
	            setTimeout(() => {
	                sessionStorage.removeItem("fbssls_744812297874344");
	                resolve();
	            }, 500);
	        });
	    });
	}
}