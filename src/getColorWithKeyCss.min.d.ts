import { StyledProps } from 'styled-components';
import { C as Color } from './types-386ba472.js';

interface GetColorWithKeyCss {
    name: string;
    color?: Partial<Color>;
    props: StyledProps<unknown>;
}
declare const getColorWithKeyCss: ({ name, color, props, }: GetColorWithKeyCss) => string;

export { GetColorWithKeyCss, getColorWithKeyCss };
