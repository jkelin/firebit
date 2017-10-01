import { deburr } from 'lodash';
import { Item, Tag, ItemId, TagId, IPasswordDB } from "../common";

interface MockData {
  items: Item[];
  tags: Tag[];
}

const defaultData: MockData = {
  items: [
    {id: 'item-123' as ItemId, title: 'Item 123', description: 'asdasd', tags: ['tag-123' as TagId]},
    {id: 'item-234' as ItemId, title: 'Item 234', description: 'fghfgh', tags: ['tag-123' as TagId, 'tag-234' as TagId]},
    {id: 'item-345' as ItemId, title: 'Item 345', description: 'fghfgh', tags: ['tag-234' as TagId]},
  ],
  tags: [
    {id: 'tag-123' as TagId, title: 'Tag 123'},
    {id: 'tag-234' as TagId, title: 'Tag 234'},
  ]
}

function delayResolve<T>(time: number, value: T): Promise<T> {
  return new Promise(resolve => setTimeout(resolve, time)).then(() => value);
}

function searchable(str: string){
  return deburr(str).toLocaleLowerCase();
}

export class MockPasswordDB implements IPasswordDB {
  private data: MockData = defaultData;
  private isLoggedInInner = false;

  public cryptoDelay: number = 500;
  public opDelay: number = 20;

  login = (username: string, password: string) => {
    const promise = delayResolve(this.cryptoDelay, username === 'username' && password === 'password');
    promise.then(x => this.isLoggedInInner = x);
    return promise;
  }

  isLoggedIn = () => {
    return this.isLoggedInInner;
  }

  searchItems = (search: string, tags?: TagId[]) => {
    const data = this.data.items.filter(item => {
      return searchable(item.title).indexOf(searchable(search)) > -1
    });

    return delayResolve(this.opDelay, data);
  }

  tags = () => {
    return delayResolve(this.opDelay, this.data.tags);
  }
}
