import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Naming as loc instead of location to avoid misunderstanding it by the native javascript window.location
  constructor(
    private loc: Location,
    private router: Router) { }

  /**
   * Navigates back (looks at browser history)
   */
  public back() {
    this.loc.back();
  }

  /**
   * Navigates forward (looks at browser history)
   */
  public forward() {
    this.loc.forward();
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
   * See: https://www.garykessler.net/library/base64.html
   * NOTE: In the URL and Filename safe variant, character 62 (0x3E) is replaced with a "-" (minus sign) 
   * and character 63 (0x3F) is replaced with a "_" (underscore)
   * In adition "="" is replaced with a "." (dot)
   * @param str to be enconded
   * @returns safeBase64 string
   */
  public static encodeToSafeBase64(str: string): string {
    const base64String = btoa(str);
    const replacedPlusByMinus = base64String.replace(/\+/g, "-");
    const replacedSlashByUnderscore = replacedPlusByMinus.replace(/\//g, "_");
    return replacedSlashByUnderscore.replace(/=/g, ".");
  }

  public getSnapshotParam(route: ActivatedRoute, paramName: string): string {
    return route.snapshot.queryParamMap.get(paramName);
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
   * Navigates to a router path with a query parameter named [routerData]
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
      this.router.navigate([routerPath], { queryParams: { routerParam: routerDataAsSafeBase64 }, replaceUrl: replaceUrl });
    }
  }

  /**
   * Navigates to a location without using router
   * @param url
   */
  public goToLocation(url: string) {
    location.href = url;
  }
}
