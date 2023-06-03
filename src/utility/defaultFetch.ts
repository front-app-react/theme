import type {} from "dotenv";
export const defaultFetch = async <T>(
  code: "sizing" | string,
  type?: "lang" | "color"
): Promise<T> => {
  if (code === "sizing") {
    return (await fetch(process.env.PUBLIC_URL + `/theme/sizing.json`)).json();
  } else if (type === "color") {
    return (
      await fetch(process.env.PUBLIC_URL + `/theme/colors/${code}.json`)
    ).json();
  }
  return (await fetch(process.env.PUBLIC_URL + `/langs/${code}.json`)).json();
};
