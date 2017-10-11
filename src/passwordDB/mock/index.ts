import { deburr, range, max } from 'lodash';
import { IPasswordDB, SearchItem, ItemId, Tag, TagId, FieldId, FieldKey, FieldType, ItemType, SpecialKeys } from '../common';
import { defaultData } from './data';

function delayResolve<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time)).then(() => value);
}

function searchable(str: string) {
  return deburr(str).toLocaleLowerCase();
}

export class MockPasswordDB implements IPasswordDB {
  cryptoDelay: number = 500;
  opDelay: number = 100;

  data = defaultData;
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
      const title = item.fields.map(this.field).find(f => f.key === SpecialKeys.title)!.value;

      return searchable(title).indexOf(searchable(search)) > -1;
    }).map(item => {
      const title = item.fields.map(this.field).find(f => f.key === SpecialKeys.title);
      const username = item.fields.map(this.field).find(f => f.key === SpecialKeys.username);
      const url = item.fields.map(this.field).find(f => f.key === SpecialKeys.url);
      const lastMod = max(item.fields.map(this.field).map(f => new Date(f.lastModification)))!.toISOString();

      return {
        id: item.id,
        title: title!.value,
        username: username && username.value,
        url: url && url.value,
        lastModification: lastMod,
        tags: item.tags,
      };
    });

    return delayResolve(this.opDelay, data);
  }

  tags = () => {
    return delayResolve(this.opDelay, this.data.tags);
  }

  readItemFieldValueByKey = async (itemId: ItemId, fieldKey: string) => {
    const field = this.item(itemId).fields.map(this.field).find(x => x.key === fieldKey);

    if (!field) {
      throw new Error('Field not found');
    }

    return delayResolve(this.opDelay, field.value);
  }

  private tag = (id: TagId) => this.data.tags.find(tag => tag.id === id)!;
  private item = (id: ItemId) => this.data.items.find(item => item.id === id)!;
  private field = (id: FieldId) => this.data.fields.find(field => field.id === id)!;
}
