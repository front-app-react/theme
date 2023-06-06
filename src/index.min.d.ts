import { C as ContextAsync, I as IDictionary, a as IUseLang, b as IColor, D as DefaultSizing, c as IUseStyle, d as DefaultContextWithName } from './types-85d50e19.js';
export { k as Color, f as DefaultContext, i as ILang, e as IMoodColor, g as ISizing, h as IStyle, O as OnContextAsync, S as StorageTheme, l as ThemeColor, j as ThemeInterface, T as ThemeStorage } from './types-85d50e19.js';
export { convertRgb, lightenDarkenColor } from './utilityColor.min.js';
export { defaultFetch } from './defaultFetch.min.js';
export { CheckSizing, CheckSizingProps, checkSizing } from './checkSizing.min.js';
export { ColorHandler, ColorHandlerProps, colorHandler } from './colorHandler.min.js';
export { GetColorWithKeyCss, getColorWithKeyCss } from './getColorWithKeyCss.min.js';
import React, { PropsWithChildren } from 'react';
import * as styled_components from 'styled-components';

declare const useLang: (prefix: string, storage: Storage, fetch: ContextAsync<IDictionary>["fetch"]) => IUseLang;

declare const useStyle: (prefix: string, storage: Storage, fetchColor: ContextAsync<IColor>["fetch"], sizing: DefaultSizing) => IUseStyle;

interface ThemeProviderProps extends Record<string, any> {
    prefix: string;
    storage?: Storage;
    readonly defaultLang: DefaultContextWithName<IDictionary>;
    readonly defaultColor: DefaultContextWithName<IColor>;
    readonly defaultSizing?: DefaultSizing;
}
interface DefaultFetch<T> {
    (code: "sizing" | string, type: "lang" | "color"): Promise<T>;
}
declare const ThemeProvider: ({ children, prefix, storage, defaultLang, defaultColor, defaultSizing, ...others }: PropsWithChildren<ThemeProviderProps>) => React.JSX.Element;

declare const useTheme: () => styled_components.DefaultTheme;

export { ContextAsync, DefaultContextWithName, DefaultFetch, DefaultSizing, IColor, IDictionary, IUseLang, IUseStyle, ThemeProvider, ThemeProviderProps, useLang, useStyle, useTheme };
