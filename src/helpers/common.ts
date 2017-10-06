import * as PropTypes from "prop-types";
import * as React from "react";
import { IPasswordDB } from "../passwordDB/index";

export type HoCComponentType<T> = React.ComponentClass<T> | React.StatelessComponent<T>;

export interface PasswordDBProviderContext {
  getPasswordDB: () => IPasswordDB;
}

export const PasswordDBProviderContextTypes = {
  getPasswordDB: PropTypes.func.isRequired,
};

export function getFunType<T>(x: (...y: any[]) => T): T {
  return undefined as any;
}
