export interface IPasswordDB {
  login: (username: string, password: string) => Promise<boolean>;
  isLoggedIn: () => boolean;
  searchItems: (search: string, tags?: TagId[]) => Promise<Item[]>;
  tags: () => Promise<Tag[]>;
}

enum TagIdBrand {}
export type TagId = TagIdBrand & string;

enum ItemIdBrand {}
export type ItemId = ItemIdBrand & string;

export interface Tag {
  id: TagId;
  title: string;
}

export interface Item {
  id: ItemId;
  title: string;
  description?: string;
  tags: TagId[];
}
