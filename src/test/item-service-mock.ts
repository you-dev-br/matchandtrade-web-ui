import {Item} from '../app/classes/pojo/item';
import {Page} from '../app/classes/search/page';
import {Pagination} from '../app/classes/search/pagination';
import {SearchResult} from '../app/classes/search/search-result';

export class ItemServiceMock {
  get(href) {
    return new Promise<Item>((resolve, reject) => {
      const item = new Item();
      item.name = 'ItemServiceMock.GET.name';
      item._href = 'ItemServiceMock.GET.href';
      resolve(item);
    });
  };

  search(page: Page, tradeMembershipHref: string): Promise<SearchResult<Item>> {
    return new Promise<SearchResult<Item>>((resolve, reject) => {
      const item1 = new Item();
      item1.name = 'ItemServiceMock.SEARCH.name1';
      item1.itemId = 1;
      item1._href = 'ItemServiceMock.SEARCH.href1';
      const item2 = new Item();
      item2.name = 'ItemServiceMock.SEARCH.name2';
      item2.itemId = 2;
      item2._href = 'ItemServiceMock.SEARCH.href2';
      
      const results = new Array<Item>();
      results.push(item1);
      results.push(item2);
      const searchResult = new SearchResult<Item>(results, new Pagination(1, 10, 2));
      resolve(searchResult);
    });
  }
  
  save(item: Item, tradeMembershipHref?: string): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      let result: Item = Object.assign({}, item);
      result.itemId = 1;
      result._href = 'itemHrefMocked';
      resolve(result);
    });
  };
}
