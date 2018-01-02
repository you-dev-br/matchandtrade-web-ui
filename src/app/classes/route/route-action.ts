export enum RouteAction {CREATE='CREATE', ACTION_PARAMETER="_action"}

export class RouteActionFactory {
  public static makeCreateAction() {
    return {[RouteAction.ACTION_PARAMETER.toString()]: RouteAction.CREATE};    
  }
}