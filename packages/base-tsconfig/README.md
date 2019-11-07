# Prettier Config

> Kienle Holdings Prettier Configuration File

## Version

- Package Version: `0.1.0`
- Style Guide Version: `0.1.0`

## Installation

1. Install peer dependencies: `yarn add typescript -D`
1. Install config `yarn add @kienleholdings/base-tsconfig`

## Usage

1. Create a file named `tsconfig.json`
1. Add the following:

```JSON
{
  "extends": "@kienleholdings/base-tsconfig",
}
```

## Recommended Customization

Going off by the base config is a great start, but won't get you too far. We recommend seeeing if
you need to modify the following:

- [`compilerOptions.baseUrl`](https://github.com/kienleholdings/typescript#base-url)
- [`compilerOptions.jsx`](https://github.com/kienleholdings/typescript#jsx)
- [`compilerOptions.lib`](https://github.com/kienleholdings/typescript#lib)
- [`compilerOptions.outDir`](https://github.com/kienleholdings/typescript#out-dir)
- [`compilerOptions.rootDir`](https://github.com/kienleholdings/typescript#root-dir)
- [`compilerOptions.sourceRoot`](https://github.com/kienleholdings/typescript#source-root)
- [`compilerOptions.target`](https://github.com/kienleholdings/typescript#target)
- [`compilerOptions.types`](https://github.com/kienleholdings/typescript#types)
- [`exclude`](https://github.com/kienleholdings/typescript#excluded-files)
- [`files`](https://github.com/kienleholdings/typescript#additional-typings)
- [`include`](https://github.com/kienleholdings/typescript#included-files)
