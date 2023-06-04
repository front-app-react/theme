import { a as ContextAsync, I as IDictionary, b as IUseLang, c as IColor, D as DefaultSizing, d as IUseStyle, e as DefaultContextWithName } from './types-386ba472.js';
export { C as Color, h as DefaultContext, k as ILang, f as IMoodColor, i as ISizing, j as IStyle, O as OnContextAsync, S as StorageTheme, T as ThemeColor, l as ThemeInterface, g as ThemeStorage } from './types-386ba472.js';
import React, { PropsWithChildren } from 'react';
import * as styled_components from 'styled-components';

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

export { ContextAsync, DefaultContextWithName, DefaultFetch, DefaultSizing, IColor, IDictionary, IUseLang, IUseStyle, ThemeProvider, ThemeProviderProps, useLang, useStyle, useTheme };
