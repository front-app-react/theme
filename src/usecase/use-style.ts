import { useCallback, useEffect, useState } from "react";
import {
  IUseStyle,
  IStyle,
  IColor,
  OnContextAsync,
  ISizing,
  defaultFetch,
  OnContextAsyncCode,
} from "../index";
import { convertRgb, lightenDarkenColor } from "../utility/utilityColor";

export const useStyle = (
  prefix: string,
  fetchColor: OnContextAsyncCode<IColor>,
  fetchSizing: OnContextAsync<ISizing>,
  storage?: Storage
): IUseStyle => {
  const [state, setState] = useState<IStyle>({
    color: {
      data: {},
      name: "",
    },
    sizing: Object(),
    loadingSizing: true,
    loadingColor: true,
    loading: true,
  });

  // useEffect(() => {
  //   let mounted = false;
  //   if (!mounted) {
  //     setState((prev) => ({
  //       ...prev,
  //       loadingSizing: true,
  //     }));
  //     fetchSizing()
  //       .then((data) => {
  //         setState((prev) => ({
  //           ...prev,
  //           loadingSizing: false,
  //           sizing: data,
  //         }));
  //       })
  //       .catch((e) => {
  //         setState((prev) => ({
  //           ...prev,
  //           loadingSizing: false,
  //         }));
  //       });
  //     return () => {
  //       mounted = true;
  //     };
  //   }
  // }, []);

  const getColor: IUseStyle["getColor"] = useCallback(
    (name, mood, opacity) => {
      if (name === "transparent") return "transparent";
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
    let data = state.color;
    if (typeof code === "string") {
      try {
        data = await fetchColor(code);
      } catch (e) {}
    } else {
      data = code;
    }
    storage?.setItem(prefix + "-color", data.name);
    setState((prev) => ({
      ...prev,
      color: data,
      loadingColor: false,
    }));
    return data;
  };

  const onChangeSizing = async (sizing?: ISizing) => {
    setState((prev) => ({
      ...prev,
      loadingSizing: true,
    }));
    let data = sizing || state.sizing;
    if (!sizing) {
      try {
        data = await fetchSizing();
      } catch (e) {}
    }

    setState((prev) => ({
      ...prev,
      sizing: data,
      loadingSizing: false,
    }));
    return data;
  };

  return {
    ...state,
    onChange,
    getColor,
    onChangeSizing,
    loading: state.loadingColor && state.loadingSizing,
  };
};
