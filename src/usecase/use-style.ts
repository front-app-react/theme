import { useCallback, useEffect, useState } from "react";
import {
  IUseStyle,
  IStyle,
  IColor,
  DefaultSizing,
  ContextAsync,
} from "../index";
import { convertRgb, lightenDarkenColor } from "../utility/utilityColor";

export const useStyle = (
  prefix: string,
  storage: Storage,
  fetchColor: ContextAsync<IColor>["fetch"],
  sizing: DefaultSizing
): IUseStyle => {
  const [state, setState] = useState<IStyle>({
    color: {
      data: {},
      name: "",
    },
    sizing:
      typeof sizing !== "function"
        ? sizing
        : {
            btn: {},
            input: {},
          },
    loadingSizing: typeof sizing === "function",
    loadingColor: true,
    loading: true,
  });

  useEffect(() => {
    if (typeof sizing === "function") {
      let mounted = false;
      if (!mounted) {
        setState((prev) => ({
          ...prev,
          loadingSizing: true,
        }));
        sizing()
          .then((data) => {
            setState((prev) => ({
              ...prev,
              loadingSizing: false,
              sizing: data,
            }));
          })
          .catch((e) => {
            setState((prev) => ({
              ...prev,
              loadingSizing: false,
            }));
          });
        return () => {
          mounted = true;
        };
      }
    }
  }, []);

  const getColor: IUseStyle["getColor"] = useCallback(
    (name, mood, opacity) => {
      if (name === "transparent") return "transparent";
      console.log({ state });

      const rgbaColor = convertRgb(
        state.color && name ? state.color.data[name] : "#000000"
      );
      opacity = typeof opacity !== "undefined" ? opacity : 1;
      switch (mood) {
        case 1: {
          return lightenDarkenColor(rgbaColor, -15, opacity);
        }
        case 2: {
          return lightenDarkenColor(rgbaColor, -30, opacity);
        }
        case -1: {
          return lightenDarkenColor(rgbaColor, 15, opacity);
        }
        case -2: {
          return lightenDarkenColor(rgbaColor, 30, opacity);
        }
        default: {
          return lightenDarkenColor(rgbaColor, 0, opacity);
        }
      }
    },
    [state]
  );

  const onChange: IUseStyle["onChange"] = async (code) => {
    setState((prev) => ({
      ...prev,
      loadingColor: true,
    }));
    let data: IColor | undefined;
    if (typeof code === "string") {
      try {
        data = await fetchColor(code);
        console.log("color async 1");
      } catch (e) {}
    } else {
      data = code;
      console.log("color 1");
    }
    storage.setItem(prefix + "-color", (data as any).name || state.color);
    setState((prev) => ({
      ...prev,
      color: data as IColor,
      loadingColor: false,
    }));
    console.log("color async 2");

    return data || state.color;
  };

  return {
    ...state,
    onChange,
    getColor,
    loading: state.loadingColor && state.loadingSizing,
  };
};
