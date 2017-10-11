import * as faker from 'faker';
import { range } from 'lodash';

import {
  FieldId,
  FieldKey,
  FieldType,
  TagId,
  ItemType,
  ItemId,
  SpecialKeys,
} from '../common';

faker.seed(1337);

function chance(fraction: number) {
  return faker.random.number({ min: 0, max: 1, precision: 10 }) < fraction ? true : undefined;
}

interface MockField {
  id: FieldId;
  key: FieldKey;
  type: FieldType;
  value: string;
  lastModification: string;
}

interface MockTag {
  id: TagId;
  title: string;
}

interface MockItem {
  id: ItemId;
  type: ItemType;
  fields: FieldId[];
  tags: TagId[];
}

interface MockData {
  items: MockItem[];
  tags: MockTag[];
  fields: MockField[];
}

function generateField(): MockField {
  return {
    id: faker.random.uuid() as FieldId,
    key: faker.internet.domainName(),
    type: FieldType.text,
    value: '',
    lastModification: faker.date.recent().toISOString(),
  };
}

function generateFieldTitle(): MockField {
  return {
    ...generateField(),
    key: SpecialKeys.title,
    type: FieldType.text,
    value: faker.internet.domainName(),
  };
}

function generateFieldUsername(): MockField {
  return {
    ...generateField(),
    key: SpecialKeys.username,
    type: FieldType.text,
    value: faker.internet.userName(),
  };
}

function generateFieldPassword(): MockField {
  return {
    ...generateField(),
    key: SpecialKeys.password,
    type: FieldType.password,
    value: faker.internet.password(),
  };
}

function generateFieldUrl(): MockField {
  return {
    ...generateField(),
    key: SpecialKeys.url,
    type: FieldType.text,
    value: faker.internet.url(),
  };
}

function generateItem() {
  const data: MockItem = {
    id: faker.random.uuid() as ItemId,
    type: ItemType.website,
    tags: range(faker.random.number({ min: 0, max: 5 })).map(_ => defaultData.tags[faker.random.number({min: 0, max: defaultData.tags.length - 1})].id),
    fields: [],
  };

  const title = generateFieldTitle();
  defaultData.fields.push(title);
  data.fields.push(title.id);

  const username = generateFieldUsername();
  defaultData.fields.push(username);
  data.fields.push(username.id);

  const password = generateFieldPassword();
  defaultData.fields.push(password);
  data.fields.push(password.id);

  const url = generateFieldUrl();
  defaultData.fields.push(url);
  data.fields.push(url.id);

  defaultData.items.push(data);
}

function generateTag() {
  const data: MockTag = {
    id: faker.random.uuid() as TagId,
    title: faker.hacker.noun(),
  };

  defaultData.tags.push(data);
}

export const defaultData: MockData = {
  items: [],
  fields: [],
  tags: [],
};

range(20).forEach(generateTag);
range(100).forEach(generateItem);
