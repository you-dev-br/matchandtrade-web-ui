import { Response } from "@angular/http";

export class Erratum {
  public description: string;
  public logMessage: string;

  constructor(error: any) {
    if (error instanceof Response) {
      const e = <Response> error;
      let description;
      try {
        description = e.json().description;
      } catch(ex) {
        // Not able to parse json. Do nothing.
      }

      // Let's use the description field if it exists
      if (description) {
        this.setProperties(e.json().description, e.statusText);
      } else {
        this.setProperties(e.text(), e.statusText);
      }
    } else {
      this.setProperties(error, "Not able to identify error instance. " + error);
    }
  }
  
  private setProperties(description: string, logMessage?: string) {
    this.description = description;
    this.logMessage = logMessage;    
  }

}
