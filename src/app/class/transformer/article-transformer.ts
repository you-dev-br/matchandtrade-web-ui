import { Article } from '../pojo/article';
import { Transformer } from './transformer';
import { HttpResponse } from '@angular/common/http';

export class ArticleTransformer extends Transformer<Article>{
  toPojo(anyObject: any): Article {
    let pojo = anyObject;
    if (anyObject instanceof HttpResponse) {
      pojo = anyObject.body;
    }
    const result = new Article();
    result.links = this.buildLinks(pojo._links);
    result.description = pojo.description;
    result.name = pojo.name;
    result.articleId = pojo.articleId;
    return result;
  }
}
