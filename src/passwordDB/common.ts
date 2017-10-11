export interface IPasswordDB {
  login: (username: string, password: string) => Promise<boolean>;
  isLoggedIn: () => boolean;
  searchItems: (search: string, tags?: TagId[]) => Promise<SearchItem[]>;
  tags: () => Promise<Tag[]>;

  readItemFieldValueByKey: (itemId: ItemId, fieldKey: FieldKey) => Promise<string>;
}

enum TagIdBrand {}
export type TagId = TagIdBrand & string;

enum ItemIdBrand {}
export type ItemId = ItemIdBrand & string;

enum FieldIdBrand {}
export type FieldId = FieldIdBrand & string;

export interface Tag {
  id: TagId;
  title: string;
}

export interface SearchItem {
  id: ItemId;
  title: string;
  username?: string;
  url?: string;
  lastModification: string;
  tags: TagId[];
}

export enum SpecialKeys {
  title = '$title',
  username = '$username',
  password = '$password',
  url = '$url',
}

export enum FieldType {
  text = 'text',
  password = 'password',
}

export enum ItemType {
  website = 'website',
}

export type FieldKey = SpecialKeys | string;
