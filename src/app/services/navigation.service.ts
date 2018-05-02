import { Injectable } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { StorageService } from './storage.service';
import { StorableMessage } from '../components/message/storable-message';

@Injectable()
export class NavigationService {

  // Naming as loc instead of location to avoid misunderstanding by the native javascript window location.
	constructor(private router: Router, private loc: Location, private storageService: StorageService) { }
	
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

	/**
	 * Decodes a string generated with encodeToSafeBase64()
	 * @param safeBase64
	 */
  public static decodeFromSafeBase64(safeBase64: string): string {
		const replacedEqualsByPeriod = safeBase64.replace(/\./g, "=");
    const replacedUnderscoreBySlash = replacedEqualsByPeriod.replace(/_/g, "/");
    const replacedPlusByMinus = replacedUnderscoreBySlash.replace(/-/g, "+");
    return atob(replacedPlusByMinus);
  }
	
  /**
	 * Navigates to a router path using a encoded (using encodeToSafeBase64()) query parameter named [routerData]
	 * This method does not support URL path parameters.
	 * @param routerPath
	 * @param routerData 
	 */
	public navigate(routerPath: string, routerData?: any, replaceUrl?: boolean) {
		if (!routerData) {
			this.router.navigate([routerPath]);
    } else {
			const routerDataAsString = JSON.stringify(routerData);
			const routerDataAsSafeBase64 = NavigationService.encodeToSafeBase64(routerDataAsString);
      this.router.navigate([routerPath], {queryParams: {routerParam: routerDataAsSafeBase64}, replaceUrl: replaceUrl});
    }
  }

  /**
	 * Obtains data when the route was created using 'navigateWithData()'
	 * @param route
   */
	public obtainData(route: ActivatedRoute): any {
		const routerDataSafeBase64 = this.getSnapshotParam(route, 'routerParam');
    if (!routerDataSafeBase64) {
			return {};
    }
    const routerDataAsString = NavigationService.decodeFromSafeBase64(routerDataSafeBase64);
    const routerDataObject = JSON.parse(routerDataAsString);
    return routerDataObject;
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
	
	public getSnapshotParam(route: ActivatedRoute, paramName: string): string {
		return route.snapshot.queryParamMap.get(paramName);
  }
  
  public setNavigationMessage(msg: any): void {
    this.storageService.setNavigationMessage(msg);
  }

  public getNavigationMessage(): StorableMessage {
    return this.storageService.removeNavigationMessage();
  }

}
