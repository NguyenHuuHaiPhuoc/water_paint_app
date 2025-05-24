import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { oauthConfig } from './oauth.config';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthenService {
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient
  ) {
    this.oauthService.configure(oauthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  get identityClaims(){
    return this.oauthService.getIdentityClaims();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get userInfo() {
    const url = 'https://www.googleapis.com/oauth1/v2/userinfo';
    
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }
}