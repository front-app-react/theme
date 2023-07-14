import { objectByString } from "@front-app-react/constants";
import { StyledProps } from "styled-components";

export interface CheckSizingProps {
  $sizing?: "sm" | "lg";
}
export interface CheckSizing {
  props: StyledProps<CheckSizingProps>;
  keyCss: string;
  keyJson?: string;
}

export const checkSizing = ({
  keyCss,
  props,
  keyJson = keyCss,
}: CheckSizing) => {
  const keyCssWithoutPrefix = keyCss.slice(
    keyCss.lastIndexOf(".") + 1,
    keyCss.length
  );
  switch (props.$sizing) {
    case "lg":
      return (
        keyCssWithoutPrefix +
        ": " +
        (objectByString(props.theme.style.sizing, keyJson + "-lg") || "") +
        ";"
      );
    case "sm":
      return (
        keyCssWithoutPrefix +
        ": " +
        (objectByString(props.theme.style.sizing, keyJson + "-sm") || "") +
        ";"
      );
    default:
      return (
        keyCssWithoutPrefix +
        ": " +
        (objectByString(props.theme.style.sizing, keyJson) || "") +
        ";"
      );
  }
};
