export enum TradeMembershipType {OWNER='OWNER', MEMBER='MEMBER'}

export class TradeMembership {
  _href: string;
  tradeMembershipId: number = null;
  tradeId: number = null;
  userId: number = null;
  type: TradeMembershipType = null;
}
