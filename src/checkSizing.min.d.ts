import { StyledProps } from 'styled-components';

interface CheckSizingProps {
    $sizing?: "sm" | "lg";
}
interface CheckSizing {
    props: StyledProps<CheckSizingProps>;
    keyCss: string;
    keyJson?: string;
}
declare const checkSizing: ({ keyCss, props, keyJson, }: CheckSizing) => string;

export { CheckSizing, CheckSizingProps, checkSizing };
