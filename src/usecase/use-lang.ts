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
      data = await fetch(code).then((data) => {
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
        return data;
      });
    }
    return data || state.dictionary;
  };

  return {
    dictionary: state.dictionary,
    onChange,
    loading: state.loading,
  };
};
