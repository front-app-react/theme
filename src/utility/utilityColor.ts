type IColorRgb = {
    r: number;
    g: number;
    b: number;
}
export function convertRgb(color: string): IColorRgb {
    const hexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    const rgbColor = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i.exec(color);
    let r = 0, g = 0, b = 0;
    if (hexColor && hexColor.length === 4) {
        r = parseInt(hexColor[1], 16);
        g = parseInt(hexColor[2], 16);
        b = parseInt(hexColor[3], 16);
    } else if (rgbColor && rgbColor.length >= 4) {
        r = parseInt(rgbColor[1]);
        g = parseInt(rgbColor[2]);
        b = parseInt(rgbColor[3]);
    }
    return { r, g, b }
}
export function lightenDarkenColor(rgb: IColorRgb, amt: number,opacity:number) {
    let { r, g, b } = rgb;
    r = r + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    g = (g & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    b = (b & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return `rgba(${r},${g},${b},${opacity})`;
}