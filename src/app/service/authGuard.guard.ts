import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const AAuthGuard: CanActivateFn = (rouute, state) => {
    const router = inject(Router);

    const account = !!localStorage.getItem('account');

    if(!account){
        router.navigateByUrl('login');
        return false;
    }
    return true;
}