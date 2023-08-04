export enum IMoodColor {
  lightest = -2,
  lighter,
  default,
  darker,
  darkest,
}
export class ThemeStorage extends Storage {
  private _data: Record<string, string> = {};

  public clear(): void {
    this._data = {};
  }

  public getItem(key: string): string {
    return this._data[key];
  }

  public setItem(key: string, value: string): void {
    this._data[key] = value;
  }

  public removeItem(key: string): void {
    delete this._data[key];
  }

  public get length(): number {
    return Object.getOwnPropertyNames(this._data).length;
  }

  public key(index: number): string {
    return Object.getOwnPropertyNames(this._data)[index];
  }
}

export interface StorageTheme {
  locale: string;
  lang: string;
}
export interface OnContextAsyncCode<T> {
  (code: string): Promise<T>;
}
export interface OnContextAsync<T> {
  (): Promise<T>;
}
// export interface ContextAsync<T> {
//   value: string;
//   fetch: OnContextAsync<T>;
// }
// export type DefaultContext<T> = ContextAsync<T> | T;
// export type DefaultContextWithName<T> = string | DefaultContext<T>;
export interface IColor {
  name: string;
  data: Record<string, string>;
}
export interface ISizing {
  btn: {
    [index: string]: string;
  };
  input: {
    [index: string]: string;
  };
  [index: string]: any;
}
export interface IStyle {
  color: IColor;
  readonly sizing: ISizing;
  loadingColor: boolean;
  loadingSizing: boolean;
  loading: boolean;
}
// export type DefaultSizing = (() => Promise<ISizing>) | ISizing;

export interface IUseStyle extends IStyle {
  readonly onChange: (code: string | IColor) => Promise<IColor>;
  readonly onChangeSizing: (sizing?: ISizing) => Promise<ISizing>;
  readonly getColor: (
    name?: string,
    mood?: IMoodColor,
    opacity?: number
  ) => string;
}

export interface IDictionary {
  "theme.locale": string;
  "theme.language": string;
  "theme.langLabel": string;
  "theme.dir": "ltr" | "rtl";
  [index: string]: string;
}
export interface ILang {
  dictionary: IDictionary;
  loading: boolean;
}
export interface IUseLang extends ILang {
  readonly onChange: (code: string | IDictionary) => Promise<IDictionary>;
}

export interface ThemeInterface extends Record<string, any> {
  readonly style: IUseStyle;
  readonly lang: IUseLang;
}
declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}

export interface Color {
  name: string;
  opacity: number;
  mood: IMoodColor;
}

export interface ThemeColor {
  variant: Partial<Color>;
  hover?: Partial<Color>;
  active?: Partial<Color>;
}
