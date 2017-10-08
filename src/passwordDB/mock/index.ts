import { deburr, range } from 'lodash';
import { IPasswordDB, Item, ItemId, Tag, TagId } from '../common';
import * as faker from 'faker';

faker.seed(1337);

function chance(fraction: number) {
  return faker.random.number({ min: 0, max: 1, precision: 10 }) < fraction ? true : undefined;
}

interface MockData {
  items: Item[];
  tags: Tag[];
}

const defaultData: MockData = {
  items: range(100).map(i => ({
    id: faker.random.uuid() as ItemId,
    title: faker.internet.domainName(),
    username: chance(0.9) && faker.internet.userName(),
    url: chance(0.75) && faker.internet.url(),
    lastModification: faker.date.recent().toISOString(),
    tags: [],
  } as Item)),
  tags: [],
};

// const defaultData: MockData = {
//   items: [
//     {id: "item-123" as ItemId, title: "Item 123", description: "asdasd", tags: ["tag-123" as TagId]},
//     {id: "item-234" as ItemId, title: "Item 234", description: "fghfgh", tags: ["tag-123" as TagId, "tag-234" as TagId]},
//     {id: "item-345" as ItemId, title: "Item 345", description: "fghfgh", tags: ["tag-234" as TagId]},
//   ],
//   tags: [
//     {id: "tag-123" as TagId, title: "Tag 123"},
//     {id: "tag-234" as TagId, title: "Tag 234"},
//   ],
// };

function delayResolve<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time)).then(() => value);
}

function searchable(str: string) {
  return deburr(str).toLocaleLowerCase();
}

export class MockPasswordDB implements IPasswordDB {
  cryptoDelay: number = 500;
  opDelay: number = 100;

  private data: MockData = defaultData;
  private isLoggedInInner = false;

  login = (username: string, password: string) => {
    const promise = delayResolve(this.cryptoDelay, username === 'username' && password === 'password');
    promise.then((x) => this.isLoggedInInner = x);

    return promise;
  }

  isLoggedIn = () => {
    return this.isLoggedInInner;
  }

  searchItems = (search: string, tags?: TagId[]) => {
    const data = this.data.items.filter((item) => {
      return searchable(item.title).indexOf(searchable(search)) > -1;
    });

    return delayResolve(this.opDelay, data);
  }

  tags = () => {
    return delayResolve(this.opDelay, this.data.tags);
  }
}
