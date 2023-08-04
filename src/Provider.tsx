import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { ThemeProvider as ThemeProviderStyledComponent } from "styled-components";
import {
  useStyle,
  useLang,
  IDictionary,
  IColor,
  ThemeStorage,
  ISizing,
  OnContextAsync,
  OnContextAsyncCode,
} from "./index";
import { defaultFetch } from "./utility/defaultFetch";

export interface ThemeProviderProps extends Record<string, any> {
  prefix: string;
  storage?: Storage;
  readonly defaultLang: string | IDictionary;
  readonly defaultColor: string | IColor;
  readonly defaultSizing?: ISizing;
  // readonly defaultSizing?: DefaultSizing;

  fetchLang?: OnContextAsyncCode<IDictionary>;
  fetchColor?: OnContextAsyncCode<IColor>;
  fetchSizing?: OnContextAsync<ISizing>;
}

export interface DefaultFetch<T> {
  (code: "sizing" | string, type: "lang" | "color"): Promise<T>;
}

export const ThemeProvider = ({
  children,
  prefix = "app",
  storage,
  defaultLang,
  defaultColor,
  defaultSizing,
  fetchLang = (code) => {
    return defaultFetch<IDictionary>(code, "lang");
  },
  fetchColor = (code) => {
    return defaultFetch<IColor>(code, "color");
  },
  fetchSizing = () => {
    return defaultFetch<ISizing>("sizing");
  },
  ...others
}: PropsWithChildren<ThemeProviderProps>) => {
  const style = useStyle(prefix, fetchColor, fetchSizing, storage);
  const lang = useLang(prefix, fetchLang, storage);

  useEffect(() => {
    const langLocal = storage?.getItem(prefix + "-lang"),
      colorLocal = storage?.getItem(prefix + "-color");

    if (typeof defaultLang === "object") {
      lang.onChange(defaultLang);
    } else {
      if (langLocal) {
        lang.onChange(langLocal);
      } else if (defaultLang) {
        lang.onChange(defaultLang);
      }
    }

    if (typeof defaultSizing === "object") {
      style.onChangeSizing(defaultSizing);
    } else {
      style.onChangeSizing();
    }

    if (typeof defaultColor === "object") {
      style.onChange(defaultColor);
    } else {
      if (colorLocal) {
        style.onChange(colorLocal);
      } else if (defaultLang) {
        style.onChange(defaultColor);
      }
    }
  }, []);

  return (
    <ThemeProviderStyledComponent
      theme={{
        style,
        lang,
        ...others,
      }}
    >
      {children}
    </ThemeProviderStyledComponent>
  );
};
