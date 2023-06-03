import React, { PropsWithChildren } from 'react';
import * as styled_components from 'styled-components';

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

type IColorRgb = {
    r: number;
    g: number;
    b: number;
};
declare function convertRgb(color: string): IColorRgb;
declare function lightenDarkenColor(rgb: IColorRgb, amt: number, opacity: number): string;

declare const defaultFetch: <T>(code: "sizing" | string, type?: "lang" | "color") => Promise<T>;

declare const useLang: (prefix: string, storage: Storage, fetch: ContextAsync<IDictionary>["fetch"]) => IUseLang;

declare const useStyle: (prefix: string, storage: Storage, fetchColor: ContextAsync<IColor>["fetch"], sizing: DefaultSizing) => IUseStyle;

interface ThemeProviderProps {
    prefix: string;
    storage?: Storage;
    readonly defaultLang: DefaultContextWithName<IDictionary>;
    readonly defaultColor: DefaultContextWithName<IColor>;
    readonly defaultSizing?: DefaultSizing;
}
interface DefaultFetch<T> {
    (code: "sizing" | string, type: "lang" | "color"): Promise<T>;
}
declare const ThemeProvider: ({ children, prefix, storage, defaultLang, defaultColor, defaultSizing, }: PropsWithChildren<ThemeProviderProps>) => React.JSX.Element;

declare const useTheme: () => styled_components.DefaultTheme;

export { Color, ContextAsync, DefaultContext, DefaultContextWithName, DefaultFetch, DefaultSizing, IColor, IDictionary, ILang, IMoodColor, ISizing, IStyle, IUseLang, IUseStyle, OnContextAsync, StorageTheme, ThemeColor, ThemeInterface, ThemeProvider, ThemeProviderProps, ThemeStorage, convertRgb, defaultFetch, lightenDarkenColor, useLang, useStyle, useTheme };
