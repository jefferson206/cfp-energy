import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const token = window.localStorage.getItem('token');
		if (token) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
