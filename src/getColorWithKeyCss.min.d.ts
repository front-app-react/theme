import { StyledProps } from 'styled-components';
import { k as Color } from './types-85d50e19.js';

interface GetColorWithKeyCss {
    name: string;
    color?: Partial<Color>;
    props: StyledProps<unknown>;
}
declare const getColorWithKeyCss: ({ name, color, props, }: GetColorWithKeyCss) => string;

export { GetColorWithKeyCss, getColorWithKeyCss };
