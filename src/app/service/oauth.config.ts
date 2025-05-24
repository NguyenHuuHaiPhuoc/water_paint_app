import { AuthConfig } from 'angular-oauth2-oidc';

export const oauthConfig:AuthConfig = {
	issuer: 'https://accounts.google.com',
	clientId: '973032155095-fjrnsdvnoeojmpaggg3smsalrp90atar.apps.googleusercontent.com',
	redirectUri: 'https://hdchemicals.vn/login',
	scope: 'openid profile email',
	showDebugInformation: true,
	strictDiscoveryDocumentValidation: false,
	skipIssuerCheck: true
}