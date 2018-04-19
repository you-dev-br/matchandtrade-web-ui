import { Response } from '@angular/http';
import { StorableMessage } from './storable-message';

export enum MessageType {INFO='INFO', ERROR='ERROR'}

export class Message {
    type: MessageType = MessageType.INFO;
    items: string[] = new Array<string>();

    private add(message: any) {
        this.items.push(this.parseMessage(message));
    }

    public parseMessage(message: any): string {
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
    
    public setNavigationMessage(msg: StorableMessage) {
        if (msg) {
            this.type = (msg.type == MessageType.ERROR ? MessageType.ERROR : MessageType.INFO);
            this.items.push(msg.text);
        }
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