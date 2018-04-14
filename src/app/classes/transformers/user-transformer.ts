import { User } from '../pojo/user';
import { Transformer } from './transformer';

export class UserTransformer extends Transformer<User> {

    public toPojo(json: any): User {
      let result = new User();
      Object.assign(result, json);
      return result;
    }

}
