import { Trade } from '../pojo/trade';

export class TradeTransformer {

    public static toPojoFromJson(json: any): Trade {
        let result = new Trade();
        result.name = json.name;
        result.tradeId = json.tradeId;
        return result;
    }

    public static toPojosFromList(list: any): Array<Trade> {
        let result = new Array<Trade>();
        for (let i = 0; i < list.length; i++) {
            result.push(this.toPojoFromJson(list[i]));
        }
        return result;
    }

}
