# React Themeing

This package is a powerful tool for designing and managing the style and language of react applications, which helps developers to easily and with minimal effort create custom designs and user interfaces.
Using this package, you will be able to easily manage different styles such as colors, fonts, sizes, color combinations and other appearance elements in your application.
support type ThemeDefault styled-components

## Demo

demo for using [demo-front-app-react](https://github.com/mahdikhanbeigi/demo-front-app-react)

## Installing

`npm i @front-app-react/theme`

## Default config

First, create the following folders and files in the server asset path
For example, it is created in the path of public folders

- public
  - langs
    - `{langName}`.json
    - en-US.json
  - theme
    - `sizing`.json
    - colors
      - `{colorName}`.json
      - light.json
- src
- package.json

The name of the langs, theme, colors folder and the sizing.json file should be the same
The extension of the data file must be json

If you use a special method to receive information, it is not necessary for the path of the files to be this way, but the file extension and name should be the same.

## The Gist

They use React context to hook into the parent <ThemeProvider /> state/methods.

```
import { ThemeProvider } from "@front-app-react/theme";
    <ThemeProvider prefix="app" defaultLang="en-US" defaultColor="light">
        ...otherCode
    </ThemeProvider>
```

### ThemeProvider Props

| props          | type                                                   | description                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| prefix\*       | string                                                 | prefix for property storage                                                                                                                                                                                              |
| defaultLang\*  | `string` or `(()=> Promise<LangData>)` or `LangData`   | `The name you chose for the language in the assets path` or `A method that takes the input of the name of the language data file and returns the language data as async` or `LangData has Similar to language json file` |
| defaultColor\* | `string` or `(()=> Promise<ColorData>)` or `ColorData` | `The name you chose for the color in the assets path` or `A method that takes the input of the name of the color data file and returns the color data as async` or `ColorData has Similar to color json file`            |
| defaultSizing  | `(()=> Promise<SizingData>)` or `SizingData`           | `A method that gives SizingData without input and response in async` or `SizingData has Similar to sizing json file` = default undefined                                                                                 |
| storage        | NodeJS Storage                                         | You can use browser memory type objects such as localstorage, sessionStorage, cookie and dedicated memory = default localStorage                                                                                         |

#### LangData

Values for language data must follow this format
| property | type | description
|--|--|--|
|theme.dir| "ltr" or "rtl" | Should be `rtl` or `ltr` |
|theme.locale| string | The name you chose for the language in the assets path |
|theme.language| string | anything |
|theme.langLabel| string | anything |
| other key selector | string | Another value you want to use in the theme |

#### ColorData

Values for color data must follow this format
| property | type | description
|--|--|--|
|name| string | The name you chose for the color in the assets path |
|data| {property : value} | List of colors |

#### SizingData

Values for sizing data must follow this format
| property | type | description
|--|--|--|
| btn | {property : value} | List button element of sizes |
| input | {property : value} | List input element of sizes |
| property | value | Other sizes |

### hook context theme

You can use React Context hook to get theme values

```
import { useTheme } from "@front-app-react/theme";

  const { lang, style } = useTheme();
```

#### lang

| property   | type                                       | description                                                                                     |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| dictionary | LangData                                   | LangData has Similar to language json file                                                      |
| loading    | boolean                                    | Check the data received                                                                         |
| onChange   | (`code` or `LangData`)=> Promise<LangData> | It can change the language with two input types - The name of the language file - Language data |

#### style

| property      | type                                           | description                                                                            |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| color         | ColorData                                      | ColorData has Similar to color json file                                               |
| sizing        | SizingData                                     | SizingData has Similar to sizing json file                                             |
| loading       | boolean                                        | Check the two data received                                                            |
| loadingColor  | boolean                                        | Check the data color received                                                          |
| loadingSizing | boolean                                        | Check the data sizing received                                                         |
| onChange      | (`code` or `SizingData`)=> Promise<SizingData> | It can change the color with two input types - The name of the color file - color data |
| getColor      | name,mood,opacity                              | Get color value from color name in 5 levels 0,1,2,3,4 and opacity                      |

## Packages

List of packages used:

- checkSizing - Getting the defined sizes of the theme
- getColorWithKeyCss - Make css color style from the theme
- colorHandler - Making theme coloring styles element

## _checkSizing_

### Description

Sizes such as padding and radius are defined in the @front-app-react/theme package.
We can create normal, small, and large sizes with the style name
It is necessary to talk about the configuration sizing of the package [@front-app-react/theme](https://www.npmjs.com/package/@front-app-react/theme)
Sample using in https://github.com/front-app-react/elements

### Usage

###### dev

```
const Typography = styled("p")`
    color : ${themeProps=> themeProps.theme.style.getColor("red")};
    ${themeProps=> {
        return checkSizing({ keyCss : "font-size", props : themeProps,keyJson : "btn.font-size" }) + ";";
    }
`
export default ()=> {
    return (
        <Typography $sizing="lg">Hello world</Typography>
    )
}
```

###### result

```
const Typography = styled("p")`
    color : #E16262;
    ${themeProps=> {
        return "font-size : 1.25rem;";
    }
`
```

### Argument 1

type object
| property | description |
|--|--|
| keyCss | property css |
| props | theme props
| keyJson | key reference sizing theme example sizing.json

### Value

The output value is property: value in css

## _getColorWithKeyCss_

### Description

Make css color style from the theme
It is necessary to talk about the configuration color of the package [@front-app-react/theme](https://www.npmjs.com/package/@front-app-react/theme)

### Usage

###### dev

```
const Button = styled("button")`
    ${themeProps=> {
        return getColorWithKeyCss({ name : "background-color",color : "red", props : themeProps }) + ";";
    }
`
```

###### result

```
const Button = styled("button")`
     color : #E16262;
    ${themeProps=> {
        return "color : #E16262;";
    }
`
```

### Argument 1

type object
| property | description |
|--|--|
| name | property css |
| color | theme color property name
| props | theme props

### Value

The output value is property: value in css

## _colorHandler_

### Description

Creates an element with color style, background color and border color with handle of mouse hover and active modes.
It is necessary to talk about the configuration color of the package [@front-app-react/elements](https://github.com/front-app-react/elements)

### Usage

###### dev

```
const Button = styled("button")`
    ${themeProps=> {
        return colorHandler(props, true) + ";";
    }
`
const ButtonWithoutStyleActions = styled("button")`
    ${themeProps=> {
        return colorHandler(props, false) + ";";
    }
`
export default ()=> {
    return (
        <Button $textColor={{
              variant: {
                name: "white",
              },
        }} $bgColor={{
              variant: {
                name: "primary",
              },
              active: {
                name: "red",
              },
        }} $borderColor={{
              variant: {
                name: "primary",
              },
        }}>Hello world</Button>
         <ButtonWithoutStyleActions $textColor={{
              variant: {
                name: "white",
              },
        }} $bgColor={{
              variant: {
                name: "primary",
              },
        }} $borderColor={{
              variant: {
                name: "primary",
              },
        }}>Hello world</Button>
    )
}
```

###### result

```
const Button = styled("button")`
    &:disabled{
         color: #5D5D5D;
        background-color: #f0f0f0;
        border-color: #f0f0f0;
  }

    &:not(:disabled) {
    color: rgb(255, 255, 255);
    background-color: rgb(58, 150, 121);
    border-color: rgb(58, 150, 121);
     &:hover {
        color: rgb(255, 255, 255);
        background-color: rgb(58, 150, 121);
        border-color: rgb(58, 150, 121);
    }
     &:active {
        color: rgb(255, 255, 255);
        background-color: rgb(225, 98, 98);
        border-color: rgb(225, 98, 98);
    }
    }
`
const ButtonWithoutStyleActions = styled("button")`
    &:not(:disabled) {
    color: rgb(255, 255, 255);
    background-color: rgb(58, 150, 121);
    border-color: transparent;
    }
`
```

### Argument 1

type object
| property | description |
|--|--|
| $textColor |[ThemeColor](https://github.com/front-app-react/elements)
| $bgColor | [ThemeColor](https://github.com/front-app-react/elements)
| $borderColor | [ThemeColor](https://github.com/front-app-react/elements)
| $isActive | type boolean, handle active mode

### Argument 2

type boolean
handle of mouse hover and active modes

### Value

The output value is multi property: value in css
