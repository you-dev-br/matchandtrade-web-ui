import { Membership, MembershipType } from '../pojo/membership';
import { Transformer } from './transformer';

export class MembershipTransformer extends Transformer<Membership>{
  toPojo(json: any): Membership {
    const result = new Membership();
    result.links = this.buildLinks(json._links);
    result.userId = json.userId;
    result.tradeId = json.tradeId;
    const typeAsString = String(json.type);
    result.type = MembershipType[typeAsString];
    return result;
  }
}
