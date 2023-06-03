import { useState } from "react";
import { ContextAsync, IDictionary, ILang, IUseLang } from "../index";

const INITIAL_DIC: IDictionary = {
  "theme.dir": "ltr",
  "theme.locale": "en-US",
  "theme.language": "english",
  "theme.langLabel": "en",
};

export const useLang = (
  prefix: string,
  storage: Storage,
  fetch: ContextAsync<IDictionary>["fetch"]
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
    let data: IDictionary | undefined;
    if (typeof code === "string") {
      try {
        data = await fetch(code);
        console.log("lang async 1");
      } catch (e) {}
    } else {
      data = code;
      console.log("lang 1");
    }
    storage.setItem(
      prefix + "-lang",
      (data as IDictionary)?.["theme.locale"] ||
        state.dictionary["theme.locale"]
    );
    setState((prev) => ({
      ...prev,
      dictionary: data as IDictionary,
      loading: false,
    }));
    console.log("lang async 2");

    return data || state.dictionary;
  };

  return {
    dictionary: state.dictionary,
    onChange,
    loading: state.loading,
  };
};
