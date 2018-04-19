import { Response } from '@angular/http';
import { MessageType } from './message';

export class StorableMessage {
    type: MessageType = MessageType.INFO;
    text: string;
}