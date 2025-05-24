import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const AAuthGuard: CanActivateFn = (rouute, state) => {
    const router = inject(Router);

    const userProfile = sessionStorage.getItem('id_token_claims_obj')
                            || sessionStorage.getItem('fbssls_744812297874344');
    
    if(!userProfile){
        router.navigateByUrl('login');
        return false;
    }else{
        const json = JSON.parse(userProfile);
        if(json) {
            if(json.authResponse == null && json.status == 'unknown')
            {
                router.navigateByUrl('login');
                return false;
            }
        }
    }
    return true;
}