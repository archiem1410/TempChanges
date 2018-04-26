import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = this.getUser();
        if (user) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.logout();
        return false;
    }

    getUser():any{
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    setUser(userData){
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    getUserId():any{
        let user = this.getUser();
        return user?user['userid']:false;
    }
    
    clearuser() {
        localStorage.removeItem('currentUser');
    }

    logout() {
        this.clearuser();
        this.router.navigate(['/']);
    }
}