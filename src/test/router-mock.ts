import { ActivatedRoute} from '@angular/router';

export class NavigationServiceMock {
  public obtainData(route: ActivatedRoute): any {
    return route.snapshot.paramMap.get('routerData');
	}
	
	public obtainUrlPathParam(route: ActivatedRoute, paramName: string): string {
		return route.snapshot.paramMap.get(paramName);
	}
}

/**
 * Implementation of ActivatedRoute which always return
 * the parameter passed in the constructor when ActivatedRouteMock.snapshopt.paramMap.get()
 * is invoked. Or returns an empty object by default.
 */
export class ActivatedRouteMock {
  constructor (parameterToBeAlwaysReturned?: any) {
    if (parameterToBeAlwaysReturned) {
      this.snapshot.paramMap.defaultParameterValue = parameterToBeAlwaysReturned;
    }
  }
  snapshot = {
    paramMap: {
      defaultParameterValue: {},
      get(paramName: any) {
        return this.defaultParameterValue;
      }
    }
  }
}
