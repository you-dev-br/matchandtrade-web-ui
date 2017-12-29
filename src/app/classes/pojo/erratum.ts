import { Response } from "@angular/http";

export class Erratum {
  public description: string;
  public logMessage: string;

  constructor(error: any) {
    if (error instanceof Response) {
      let e = <Response> error;
      this.setProperties(e.text(), e.statusText);
    } else {
      this.setProperties(error, "Not able to identify error instance. " + error);
    }
  }
  
  private setProperties(description: string, logMessage?: string) {
    this.description = description;
    this.logMessage = logMessage;    
  }

}
