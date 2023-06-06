import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { ThemeProvider as ThemeProviderStyledComponent } from "styled-components";
import {
  useStyle,
  useLang,
  IDictionary,
  IColor,
  ThemeStorage,
  DefaultSizing,
  DefaultContextWithName,
  ISizing,
} from "./index";
import { defaultFetch } from "./utility/defaultFetch";

export interface ThemeProviderProps extends Record<string, any> {
  prefix: string;
  storage?: Storage;
  readonly defaultLang: DefaultContextWithName<IDictionary>;
  readonly defaultColor: DefaultContextWithName<IColor>;
  readonly defaultSizing?: DefaultSizing;
  // readonly defaultSizing?: DefaultSizing;
}

export interface DefaultFetch<T> {
  (code: "sizing" | string, type: "lang" | "color"): Promise<T>;
}

export const ThemeProvider = ({
  children,
  prefix,
  storage = new ThemeStorage(),
  defaultLang,
  defaultColor,
  defaultSizing,
  ...others
}: PropsWithChildren<ThemeProviderProps>) => {
  const style = useStyle(
    prefix,
    storage,
    typeof defaultColor !== "function" || typeof defaultColor === "string"
      ? (code) => {
          return defaultFetch<IColor>(code, "color");
        }
      : defaultColor,
    typeof defaultSizing === "undefined"
      ? () => {
          return defaultFetch<ISizing>("sizing");
        }
      : defaultSizing
  );
  const lang = useLang(
    prefix,
    storage,
    typeof defaultLang !== "function" || typeof defaultLang === "string"
      ? (code) => {
          return defaultFetch<IDictionary>(code, "lang");
        }
      : defaultLang
  );

  useEffect(() => {
    let mounted = false;
    const checkDefault = async () => {
      const langLocal = storage.getItem(prefix + "-lang"),
        colorLocal = storage.getItem(prefix + "-color");

      if (langLocal) {
        lang.onChange(langLocal);
      } else {
        if (
          typeof defaultLang === "object" &&
          defaultLang.fetch &&
          typeof defaultLang.fetch === "function"
        ) {
          const data = await defaultLang.fetch(defaultLang.value);
          lang.onChange(data);
        } else {
          lang.onChange(defaultLang as any);
        }
      }
      if (colorLocal) {
        style.onChange(colorLocal);
      } else {
        const _defaultColor = defaultColor as any;
        if (
          typeof defaultColor === "object" &&
          _defaultColor.fetch &&
          typeof _defaultColor.fetch === "function"
        ) {
          const data = await _defaultColor.fetch(_defaultColor.value);
          style.onChange(data);
        } else {
          style.onChange(_defaultColor as any);
        }
      }
    };
    if (!mounted) {
      checkDefault();
    }

    return () => {
      mounted = true;
    };
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
