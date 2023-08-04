import { useState } from "react";
import { IDictionary, ILang, IUseLang, OnContextAsyncCode } from "../index";

const INITIAL_DIC: IDictionary = {
  "theme.dir": "ltr",
  "theme.locale": "en-US",
  "theme.language": "english",
  "theme.langLabel": "en",
};

export const useLang = (
  prefix: string,
  fetchLang: OnContextAsyncCode<IDictionary>,
  storage?: Storage
): IUseLang => {
  const [state, setState] = useState<ILang>({
    dictionary: INITIAL_DIC,
    loading: true,
  });

  const onChange: IUseLang["onChange"] = async (code) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    let data = state.dictionary;

    if (typeof code === "string") {
      try {
        data = await fetchLang(code);
      } catch (e) {}
    } else {
      data = code;
    }
    setState((prev) => ({
      ...prev,
      dictionary: data,
      loading: false,
    }));
    storage?.setItem(prefix + "-lang", (data as IDictionary)?.["theme.locale"]);
    return data || state.dictionary;
  };

  return {
    dictionary: state.dictionary,
    onChange,
    loading: state.loading,
  };
};
