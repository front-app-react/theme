import { StyledProps } from "styled-components";
import { getColorWithKeyCss } from "./getColorWithKeyCss";
import { mergeDeep } from "@front-app-react/constants";
import { ThemeColor } from "../types";

export interface ColorHandlerProps {
  $textColor?: Partial<ThemeColor>;
  $bgColor?: Partial<ThemeColor>;
  $borderColor?: Partial<ThemeColor>;
  $isActive?: boolean;
}
export type ColorHandler = StyledProps<Omit<ColorHandlerProps, "$sizing">>;

export const colorHandler = (props: ColorHandler, isAction = true) => {
  const textColorHover = mergeDeep(
      props.$textColor?.variant,
      props.$textColor?.hover
    ),
    textColorActive = mergeDeep(textColorHover, props.$textColor?.active),
    bgColorHover = mergeDeep(props.$bgColor?.variant, props.$bgColor?.hover),
    bgColorActive = mergeDeep(bgColorHover, props.$bgColor?.active),
    borderColor = props.$borderColor?.variant,
    borderColorHover = mergeDeep(borderColor, props.$borderColor?.hover),
    borderColorActive = mergeDeep(borderColorHover, props.$borderColor?.active);

  return `
  &:disabled{
    ${getColorWithKeyCss({
      name: "color",
      color: {
        name: "txt",
      },
      props,
    })}
    ${getColorWithKeyCss({
      name: "background-color",
      color: {
        name: "grey",
      },
      props,
    })}
    ${getColorWithKeyCss({
      name: "border-color",
      color: {
        name: "grey",
      },
      props,
    })}
  }

  &:not(:disabled){
    ${
      textColorActive || props.$textColor?.variant
        ? getColorWithKeyCss({
            name: "color",
            color: props.$isActive
              ? textColorActive
              : props.$textColor?.variant,
            props,
          })
        : ""
    }
   
    ${
      bgColorActive || props.$bgColor?.variant
        ? getColorWithKeyCss({
            name: "background-color",
            color: props.$isActive ? bgColorActive : props.$bgColor?.variant,
            props,
          })
        : "background-color : transparent;"
    }
    ${
      borderColor || borderColorActive
        ? getColorWithKeyCss({
            name: "border-color",
            color: props.$isActive ? borderColorActive : borderColor,
            props,
          })
        : "border-color : transparent;"
    }
    ${
      isAction && !props.$isActive
        ? `
    &:hover{
      ${
        textColorHover
          ? getColorWithKeyCss({
              name: "color",
              color: textColorHover,
              props,
            })
          : ""
      }
      ${
        bgColorHover
          ? getColorWithKeyCss({
              name: "background-color",
              color: bgColorHover,
              props,
            })
          : ""
      }
      ${
        borderColorHover
          ? getColorWithKeyCss({
              name: "border-color",
              color: borderColorHover,
              props,
            })
          : ""
      }
    }
    &:active{
      ${
        textColorActive
          ? getColorWithKeyCss({
              name: "color",
              color: textColorActive,
              props,
            })
          : ""
      }
      ${
        bgColorActive
          ? getColorWithKeyCss({
              name: "background-color",
              color: bgColorActive,
              props,
            })
          : ""
      }
      ${
        borderColorActive
          ? getColorWithKeyCss({
              name: "border-color",
              color: borderColorActive,
              props,
            })
          : ""
      }
    }
    `
        : ""
    }
  `;
};
