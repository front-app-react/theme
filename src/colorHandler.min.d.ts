import { StyledProps } from 'styled-components';
import { T as ThemeColor } from './types-386ba472.js';

interface ColorHandlerProps {
    $textColor?: Partial<ThemeColor>;
    $bgColor?: Partial<ThemeColor>;
    $borderColor?: Partial<ThemeColor>;
    $isActive?: boolean;
}
type ColorHandler = StyledProps<Omit<ColorHandlerProps, "$sizing">>;
declare const colorHandler: (props: ColorHandler, isAction?: boolean) => string;

export { ColorHandler, ColorHandlerProps, colorHandler };
