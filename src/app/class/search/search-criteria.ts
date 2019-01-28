export enum Field {ARTICLE_ID='Article.articleId', ARTICLE_NAME='Article.name', USER_ID='User.userId'};
export enum Matcher {EQUALS='EQUALS', NOT_EQUALS='NOT_EQUALS', EQUALS_IGNORE_CASE='EQUALS_IGNORE_CASE', LIKE_IGNORE_CASE='LIKE_IGNORE_CASE'};
export enum Operator {AND='AND', OR='OR'};
export enum Recipe {ARTICLES='ARTICLES'};
export enum SortType {ASC='ASC', DESC='DESC'};

export class Criterion {
  constructor(
    public field: string,
    public value: any,
    public operator?: Operator,
    public matcher?: Matcher) {
  }
}

export class SearchCriteria {
  recipe: Recipe;
  sorts: Sort[] = [];
  criteria: Criterion[] = Array<Criterion>();

  addCriterion(field: string, value: any, operator?: Operator, matcher?: Matcher) {
    this.criteria.push(new Criterion(field, value, operator, matcher));
  }
  
  addSort(field: string, type: SortType) {
    this.sorts.push(new Sort(field, type));
  }
}

export class Sort {
  constructor(
    public field: string,
    public type: SortType) {
  }
}