export enum Recipe {ITEMS='ITEMS'};
export enum Operator {AND='AND', OR='OR'};
export enum Matcher {EQUALS='EQUALS', NOT_EQUALS='NOT_EQUALS', EQUALS_IGNORE_CASE='EQUALS_IGNORE_CASE', LIKE_IGNORE_CASE='LIKE_IGNORE_CASE'};

export class Criterion {
	key: string;
	value: any;
	operator: Operator;
	matcher: Matcher;
	constructor(key: string, value: any, operator: Operator, matcher: Matcher) {
		this.key = key;
		this.value = value;
		this.operator = operator;
		this.matcher = matcher;
	}
}

export class SearchCriteria {
	recipe: Recipe;
	criteria: Criterion[] = Array<Criterion>();

	addCriteria(key: string, value: any, operator: Operator, matcher: Matcher) {
		this.criteria.push(new Criterion(key, value, operator, matcher));
	}

}


