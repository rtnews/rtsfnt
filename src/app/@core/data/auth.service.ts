import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth'

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router, protected auth: NbAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAuth = false;
        this.auth.isAuthenticated().subscribe((result) => {
            console.log(result);
            if (null != result) {
                isAuth = true;
            }
        });
        if (isAuth) return true;
        //this.router.navigateByUrl('/auth/login');
        return true;
    }
}
