import { Injectable } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class NavigationService {

  constructor(private router: Router) { }

  /**
   * See: https://www.garykessler.net/library/base64.html
   * NOTE: In the URL and Filename safe variant, character 62 (0x3E) is replaced with a "-" (minus sign) 
   * and character 63 (0x3F) is replaced with a "_" (underscore).
   * In adition = is replaced by .
   * @param base64String 
   */
  private convertRegularBase64ToSafeBase64(base64String: string): string {
    let replacedPlusByMinus = base64String.replace("+", "-");
    let replacedSlashByUnderscore = replacedPlusByMinus.replace("/", "_");
    let replacedEqualsByPeriod = replacedPlusByMinus.replace("=", ".");
    return replacedEqualsByPeriod;
  }

  private static convertSafeBase64ToRegularBase64(safeBase64String: string): string {
    let replacedMinusByPlus = safeBase64String.replace("-", "+");
    let replacedUnderscoreBySlash = replacedMinusByPlus.replace("_", "/");
    let replacedPeriodByEquals = replacedMinusByPlus.replace(".", "=");
    return replacedPeriodByEquals;
  }

  public navigate(routerPath: string, routerData?: any) {
    if (!routerData) {
      this.router.navigate([routerPath]);
    } else {
      const routerDataAsString = JSON.stringify(routerData);
      const routerDataAsBase64 = btoa(routerDataAsString);
      this.router.navigate([routerPath, {routerData: this.convertRegularBase64ToSafeBase64(routerDataAsBase64)}]);
    }
  }

  public static obtainData(route: ActivatedRoute): any {
    const routerDataSafeBase64 = route.snapshot.paramMap.get('routerData');
    if (!routerDataSafeBase64) {
      return {};
    }
    const routerDataUnsafeBase64 = this.convertSafeBase64ToRegularBase64(routerDataSafeBase64);
    const routerDataAsString = atob(routerDataUnsafeBase64);
    const routerDataObject = JSON.parse(routerDataAsString);
    return routerDataObject;
  }
  
}
