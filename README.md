# Typescript Style Guide

> A Bullshit-Free Approach to Typescript

## Table of Contents

1. [Additional Typings](#additional-typings)
1. [Automatic Type Definition Acquisition](#automatic-type-definition-acquisition)
1. [Compile on Save](#compile-on-save)
1. [Excluded Files](#excluded-files)
1. [Included Files](#included-files)
1. [Monorepo Setup](#monorepo-setup-extending-your-config)
1. [Compiler Options](#compiler-options)

## Additional Typings

If for some reason you need to create additional types (i.e. you're using an npm module without an
included `<module-name>.d.ts` or `@types/`) additional typings should be created in a `./types`
folder in the root of your project's directory, and included in the `files` section of your
project's `tsconfig.json`. If this project is a monorepo, we recommend including those typings in
the specific package, not in your base `tsconfig.json`. (`tsconfig.files`)

> **Why?** By keeping your additional typings in a single directory, per-project, it ensures that
> additional typings are both easy to find and easy to modify. If you don't include those typings in
> the `files` section of your `tsconfig.json`, the transipler will ignore them.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "files": "./types/some-module.d.ts"
}

// Bad
{
  "files": "./src/some-file.ts"
}
```
<!-- prettier-ignore-end -->

## Automatic Type Definition Acquisition

Automatic Type Definition Acquisition should be disabled. (`tsconfig.typeAcquisition`)

> **Why?** By enabling Type Acquisition, the latest version of the package's types are imported
> automatically, regardless of which version of the package you have installed, which could create
> type definition mismatches, and unforeseen bugs.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "typeAcquisition": {
    "enable": false
  }
}

// Bad
{
  "typeAcquisition": {
    "enable": true
  }
}
```
<!-- prettier-ignore-end -->

## Compile on Save

Compilation on save should be disabled in your project's `tsconfig.json`.
([`tsconfig.compileOnSave`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#compileonsave))

> **Why?** Although this option does speed up compilation for bigger projects, we've found that it
> can unexpectedly break transpilation entirely and result in missing files. We recommend not
> enabling this until the feature becomes more stable.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compileOnSave": false
}

// Bad
{
  "compileOnSave": true
}
```
<!-- prettier-ignore-end -->

## Excluded Files

Generally speaking, `node_modules` should be the only directory ignored, however this is more
project-by-project. If you have any other TypeScript files that you feel should be excluded, feel
free to add them to this array. For example, you may also want to exclude your tests so they're not
accidentally transpiled and included with your final JavaScript source (`tsconfig.exclude`)

> **Why?** By explicitly excluding `node_modules` we make sure that we're not transpiling any extra
> TypeScript files that might be lingering, increasing our code and / or bundle size.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "exclude": ["./node_modules"],
}

{
  "exclude": ["./node_modules", "./src/**/*.test.ts"],
}

// Bad
{
  "exclude": ["./src/some-other.ts"],
}
```
<!-- prettier-ignore-end -->

## Included Files

Except for the files noted in [Excluded Files](#excluded-files), every `.ts` file in your project's
`./src` directory should be included. You may want to include additional file types, such as `.tsx`
or `.vue` if your project uses React or Vue. (`tsconfig.includes`)

> **Why?** By keeping your project's source files in a single `./src` directory, it makes it easy
> for other developers to distinguish what code will make it into the release, and what code is for
> developers only.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "include": ["./src/**/*.ts"],
}

{
  "include": ["./src/**/*.ts", "./src/**/*.tsx"],
}

// Bad
{
  "include": ["node_modules"],
}

{
  "include": ["./lib/some-file.ts"],
}
```
<!-- prettier-ignore-end -->

## Monorepo Setup (Extending your Config)

In the case of a monorepo, rather than duplicating and changing a `tsconfig.json` for each project,
each project should branch off of a base `tsconfig.json` that stores common configuration. With this
syntax in mind, we also recommend for the time being not using project references. Since we usee
Lerna for monorepos, `tsconfig.references` should be left as an empty array. (`tsconfig.extends`,
`tsconfig.references`).

> **Why?** By storing common configuration in a single, base config, you ensure that when you update
> one config, you don't forget to update the others in the repo, which helps with consistent rules
> and type checking.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "extends": ["../../tsconfig.json"]
}

// Bad
{
  "foo": "bar",
  "references": [{ "path": "some-other-tsconfig.json" }]
}

{
  "foo": "baz",
}
```
<!-- prettier-ignore-end -->

## Compiler Options

### Charset

The compiler's charset should be `utf8`. (`compilerOptions.charset`)

> **Why?** We set the charset to utf-8 by default in browsers, so we think it makes sense to keep
> our TypeScript the same.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "charset": "utf8"
  }
}

// Bad
{
  "compilerOptions": {
    "charset": "ascii"
  }
}
```
<!-- prettier-ignore-end -->

### Composite

The compiler's composite option should be `false`. (`compilerOptions.composite`)

> **Why?** Since we're not using project references, there's no reason for this to be enabled.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "composite": false
  }
}

// Bad
{
  "compilerOptions": {
    "composite": true
  }
}
```
<!-- prettier-ignore-end -->

### Declaration

The compiler's declaration option should be `false`. (`compilerOptions.declaration`)

> **Why?** In order to save transpile time, definitions should only be transpiled as needed, rather
> than on every run. This is especially true for applications that may have filesystem watching,
> such as something running on the Webpack dev server.

### Declaration Directory

The compiler's declaration directory option should (in most cases) be undefined.
(`compilerOptions.declarationDir`)

> **Why?** Most applications we write have no automatically generated declarations (see
> [Declaration](#declaration)), and therefore we have no reason to set a value.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Sometimes Bad (Unless you're actually generating declarations)
{
  "compilerOptions": {
    "declarationDir": "./some-dir"
  }
}
```
<!-- prettier-ignore-end -->

### Diagnostics

The compiler's diagnostics option should either be true or false depending on the project's current
needs. (`compilerOptions.diagnostics`)

> > **Why?** If your running into unexplainable errors or performance loss, it may be good to enable
> > diagnostics, but if not, it can easily clutter your console and you might accidentally lose
> > track of other important data. We have no formal opinion on the diagnostics option.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "diagnostics": true
  }
}

{
  "compilerOptions": {
    "diagnostics": false
  }
}
```
<!-- prettier-ignore-end -->
