import { LinkSupport } from './link-support';

export enum TradeMembershipType {OWNER='OWNER', MEMBER='MEMBER'}

export class Membership extends LinkSupport {
	userId: number; 
	tradeId: number;
	type: TradeMembershipType;
}
