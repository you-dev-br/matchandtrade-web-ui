import { Response } from '@angular/http';

export enum MessageType {INFO='INFO', ERROR='ERROR'}

export class Message {
    type: MessageType = MessageType.INFO;
    items: string[] = new Array<string>();

    private add(message: any) {
        this.items.push(this.parseMessage(message));
    }

    private parseMessage(message: any): string {
        let result;
        if (message instanceof Response) {
            const e = <Response> message;
            try {
                let responseDescription = e.json().description;
                if (responseDescription) {
                    result = responseDescription;
                } else {
                    result = e.statusText;
                }
            } catch(ex) {
                result = e.toString();
            }
        } else {
            result = message.toString();
        }
        return result;
    }
    
    public setErrorItems(msgs: any) {
        this.type = MessageType.ERROR;
        this.setItems(msgs);
    }
    
    public setInfoItems(msgs: any) {
        this.type = MessageType.INFO;
        this.setItems(msgs);
    }
    
    private setItems(msgs: any) {
        this.items.forEach(v => {
            this.items.pop();
        });
        this.items.push(this.parseMessage(msgs));
    }
    
    public setType(type: MessageType): void {
        this.type = type;
    }
}