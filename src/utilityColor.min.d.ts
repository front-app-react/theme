type IColorRgb = {
    r: number;
    g: number;
    b: number;
};
declare function convertRgb(color: string): IColorRgb;
declare function lightenDarkenColor(rgb: IColorRgb, amt: number, opacity: number): string;

export { convertRgb, lightenDarkenColor };
