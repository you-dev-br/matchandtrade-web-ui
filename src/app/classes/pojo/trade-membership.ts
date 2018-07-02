import { LinkSupport } from "./link-support";

export enum TradeMembershipType {OWNER='OWNER', MEMBER='MEMBER'}

export class TradeMembership extends LinkSupport {
  tradeMembershipId: number = null;
  tradeId: number = null;
  userId: number = null;
  type: TradeMembershipType = null;
}
