'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Authentication } from '../pojo/authentication';

export const AUTHORIZATION_HEADER_SUBJECT = new Subject<Authentication>();
export const AUTHORIZATION_HEADER_OBSERVABLE = AUTHORIZATION_HEADER_SUBJECT.asObservable();
