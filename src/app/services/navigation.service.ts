import { Injectable } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class NavigationService {

  // Naming as loc instead of location to avoid misunderstanding by the native javascript window location.
  constructor(private router: Router, private loc: Location) { }

  /**
   * See: https://www.garykessler.net/library/base64.html
   * NOTE: In the URL and Filename safe variant, character 62 (0x3E) is replaced with a "-" (minus sign) 
   * and character 63 (0x3F) is replaced with a "_" (underscore).
   * In adition = is replaced by .
   * @param base64String 
   */
  public static encodeToSafeBase64(input: string): string {
    const base64String = btoa(input);
    const replacedPlusByMinus = base64String.replace(/\+/g, "-");
    const replacedSlashByUnderscore = replacedPlusByMinus.replace(/\//g, "_");
    return replacedSlashByUnderscore.replace(/=/g, ".");
  }

  public static decodeFromSafeBase64(input: string): string {
		const replacedEqualsByPeriod = input.replace(/\./g, "=");
    const replacedUnderscoreBySlash = replacedEqualsByPeriod.replace(/_/g, "/");
    const replacedPlusByMinus = replacedUnderscoreBySlash.replace(/-/g, "+");
    return atob(replacedPlusByMinus);
  }
	
  /**
	 * Navigates to a router path using a query parameter named [routerData] with URL safe data.
	 * This method does not support URL path parameters.
	 * @param routerPath
	 * @param routerData 
   */
	public navigateWithData(routerPath: string, routerData?: any) {
		if (!routerData) {
			this.router.navigate([routerPath]);
    } else {
			const routerDataAsString = JSON.stringify(routerData);
			const routerDataAsSafeBase64 = NavigationService.encodeToSafeBase64(routerDataAsString);
      this.router.navigate([routerPath, {routerData: routerDataAsSafeBase64}]);
    }
  }

  /**
   * Navigates to a router path using.
   * It supports path parameters which are required when present in the URL.
   * It is also recomended to use this method when the URL does not require any data.
   * @param navigationParameters
   */
  public navigate(navigationParameters: Array<any>): void {
		const routerParameters = new Array();
    routerParameters.push(navigationParameters[0]);
    for(let i=1; i<navigationParameters.length; i++) {
			const base64ParamSafe = NavigationService.encodeToSafeBase64(navigationParameters[i]);
      routerParameters.push(base64ParamSafe);
    }
    this.router.navigate(routerParameters);
  }
	
  /**
	 * Obtains data when the route was created using 'navigateWithData()'
	 * @param route
   */
	public obtainData(route: ActivatedRoute): any {
		const routerDataSafeBase64 = this.getSnapshotParam(route, 'routerData');
    if (!routerDataSafeBase64) {
			return {};
    }
    const routerDataAsString = NavigationService.decodeFromSafeBase64(routerDataSafeBase64);
    const routerDataObject = JSON.parse(routerDataAsString);
    return routerDataObject;
  }

  /**
   * Obtain data when teh route was created using 'navigate()'
   * @param route
   * @param paramName 
   */
  public obtainUrlPathParam(route: ActivatedRoute, paramName: string): string {
    const param = route.snapshot.paramMap.get(paramName);
    return NavigationService.decodeFromSafeBase64(param);
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
	
	getSnapshotParam(route: ActivatedRoute, paramName: string): string {
		return route.snapshot.paramMap.get(paramName);
	}

}
