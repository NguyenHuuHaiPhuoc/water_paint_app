import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkOSr2JjJoDqwsX2Pe1nWocEUjfxM1TzQ",
  authDomain: "recruitmentweb-b9ddb.firebaseapp.com",
  databaseURL: "https://recruitmentweb-b9ddb-default-rtdb.firebaseio.com",
  projectId: "recruitmentweb-b9ddb",
  storageBucket: "recruitmentweb-b9ddb.appspot.com",
  messagingSenderId: "973032155095",
  appId: "1:973032155095:web:ea0c6e110abc74a9038d92",
  measurementId: "G-QPZMXFX67R"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      BrowserAnimationsModule,
      OAuthModule.forRoot()
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('744812297874344')
          }
        ],
        onError: (err: any) => console.error(err)
      } as SocialAuthServiceConfig
    }
  ]
};