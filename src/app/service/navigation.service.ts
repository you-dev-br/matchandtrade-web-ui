import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Naming as loc instead of location to avoid misunderstanding by the native javascript window location.
	constructor(
		private loc: Location,
		private router: Router) { }

	/**
	 * Navigates to a router path with a query parameter named [routerData]
	 * This method does not support URL path parameters.
	 * @param routerPath
	 * @param routerData 
	 */
	public navigate(routerPath: string, routerData?: any, replaceUrl?: boolean) {
		if (!routerData) {
			this.router.navigate([routerPath]);
    } else {
      this.router.navigate([routerPath], {queryParams: {routerParam: routerData}, replaceUrl: replaceUrl});
    }
  }
	
	/**
   * Navigates back (looks at browser history)
   */
  public back() {
    this.loc.back();
	}

	/**
   * Navigates to a location without using router
   * @param url
   */
  public goToLocation(url: string) {
    location.href = url;
	}
}
