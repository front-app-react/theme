declare enum IMoodColor {
    lightest = -2,
    lighter = -1,
    default = 0,
    darker = 1,
    darkest = 2
}
declare class ThemeStorage implements Storage {
    private _data;
    clear(): void;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    get length(): number;
    key(index: number): string;
}
interface StorageTheme {
    locale: string;
    lang: string;
}
interface OnContextAsync<T> {
    (code: string): Promise<T>;
}
interface ContextAsync<T> {
    value: string;
    fetch: OnContextAsync<T>;
}
type DefaultContext<T> = ContextAsync<T> | T;
type DefaultContextWithName<T> = string | DefaultContext<T>;
interface IColor {
    name: string;
    data: Record<string, string>;
}
interface ISizing {
    btn: {
        [index: string]: string;
    };
    input: {
        [index: string]: string;
    };
    [index: string]: any;
}
interface IStyle {
    color: IColor;
    readonly sizing: ISizing;
    loadingColor: boolean;
    loadingSizing: boolean;
    loading: boolean;
}
type DefaultSizing = (() => Promise<ISizing>) | ISizing;
interface IUseStyle extends IStyle {
    readonly onChange: (code: string | IColor) => Promise<IColor>;
    readonly getColor: (name?: string, mood?: IMoodColor, opacity?: number) => string;
}
interface IDictionary {
    "theme.locale": string;
    "theme.language": string;
    "theme.langLabel": string;
    "theme.dir": "ltr" | "rtl";
    [index: string]: string;
}
interface ILang {
    dictionary: IDictionary;
    loading: boolean;
}
interface IUseLang extends ILang {
    readonly onChange: (code: string | IDictionary) => Promise<IDictionary>;
}
interface ThemeInterface {
    readonly style: IUseStyle;
    readonly lang: IUseLang;
}
declare module "styled-components" {
    interface DefaultTheme extends ThemeInterface {
    }
}
interface Color {
    name: string;
    opacity: number;
    mood: IMoodColor;
}
interface ThemeColor {
    variant: Partial<Color>;
    hover?: Partial<Color>;
    active?: Partial<Color>;
}

export { Color as C, DefaultSizing as D, IDictionary as I, OnContextAsync as O, StorageTheme as S, ThemeColor as T, ContextAsync as a, IUseLang as b, IColor as c, IUseStyle as d, DefaultContextWithName as e, IMoodColor as f, ThemeStorage as g, DefaultContext as h, ISizing as i, IStyle as j, ILang as k, ThemeInterface as l };
