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

### Allow JS

The compiler's allow js option should be `true`. (`compilerOptions.allowJs`)

> **Why?** THis allows TypeScript to do a quick sanity check on JavaScript files that you might have
> in your project, such as webpack configs.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "allowJs": true
  }
}

// Bad
{
  "compilerOptions": {
    "allowJS": false
  }
}
```
<!-- prettier-ignore-end -->

### Allow Synthetic Default Imports

The compiler's allow synthetic default imports option should be `true`.
(`compilerOptions.allowSyntheticDefaultImports`)

> **Why?** Generally non es modules won't include a "default" export. This ensures that when
> transpiled, they'll behave like ES modules, despite being CommonJS.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}

// Bad
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false
  }
}
```
<!-- prettier-ignore-end -->

### Allow UMD Global Access

The compiler's allow UMD global access option should be `true`.
(`compilerOptions.allowUmdGlobalAccess`)

> **Why?** This allows you to reference UMD global declarations from anywhere, even modules. For
> more information, check out
> [Microsoft's blog post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/#the---allowumdglobalaccess-flag).

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "allowUmdGlobalAccess": true
  }
}

// Bad
{
  "compilerOptions": {
    "allowUmdGlobalAccess": false
  }
}
```
<!-- prettier-ignore-end -->

### Allow Unreachable Code

The compiler's allow unreachable code option should be `false`.
(`compilerOptions.allowUnreachableCode`)

> **Why?** Unreachable code will never be executed, and adds bloat to the final code.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "allowUnreachableCode": false
  }
}

// Bad
{
  "compilerOptions": {
    "allowUnreachableCode": true
  }
}
```
<!-- prettier-ignore-end -->

### Allow Unused Labels

The compiler's allow unused labels option should be `false`. (`compilerOptions.allowUnusedLabels`)

> **Why?** Unused labels add bloat to final code.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "allowUnusedLabels": false
  }
}

// Bad
{
  "compilerOptions": {
    "allowUnusedLabels": true
  }
}
```
<!-- prettier-ignore-end -->

### Always Strict

The compiler's always strict option should be `true`. (`compilerOptions.alwaysStrict`)

> **Why?** This forces TypeScript to parse using JavaScript's strict mode, which comes with its
> whole set of advantages.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "alwaysStrict": true
  }
}

// Bad
{
  "compilerOptions": {
    "alwaysStrict": false
  }
}
```
<!-- prettier-ignore-end -->

### Base URL

The compiler's base url option should be `undefined` unless you're developing in a monorepo.
(`compilerOptions.baseUrl`)

> **Why?** The `baseUrl` option is useful if you're working in a monorepo and are importing files as
> if they were packages (i.e. `import localFile from 'localFile'` rather than
> `import localFile from './localFile'`). If you're not in a monorepo using imports this way, it can
> be safely left undefined.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Good if using a monorepo
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```
<!-- prettier-ignore-end -->

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

### Check JS

The compiler's check JS option should be `false`. (`compilerOptions.checkJs`)

> **Why?** Generally JavaScript files aren't meant to by type checked, so we like to disable this by
> default.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "checkJs": false
  }
}

// Bad
{
  "compilerOptions": {
    "checkJs": true
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

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "declaration": false
  }
}

// Bad
{
  "compilerOptions": {
    "declaration": true
  }
}
```
<!-- prettier-ignore-end -->

### Declaration Directory

The compiler's declaration directory option should (in most cases) be `undefined`.
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

### Declaration Map

The compiler's declaration map option should be `false`. (`compilerOptions.declarationMap`)

> **Why?** Generating maps for declarations doesn't really make any sense, as they won't be used by
> JavaScript,

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "declarationMap": false
  }
}

// Bad
{
  "compilerOptions": {
    "declarationMap": true
  }
}
```
<!-- prettier-ignore-end -->

### Diagnostics

The compiler's diagnostics option should either be `true` or `false` depending on the project's
current needs. (`compilerOptions.diagnostics`)

> **Why?** If your running into unexplainable errors or performance loss, it may be good to enable
> diagnostics, but if not, it can easily clutter your console and you might accidentally lose track
> of other important data. We have no formal opinion on the diagnostics option.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "diagnostics": true
  }
}

// Bad
{
  "compilerOptions": {
    "diagnostics": false
  }
}
```
<!-- prettier-ignore-end -->

### Disable Size Limit

The compiler's disable size limit option should be `true`. (`compilerOptions.disableSizeLimit`)

> **Why?** One of the great things about TypeScript is its scalability across large projects.
> Enforcing a size limit goes against that.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "disableSizeLimit": true
  }
}

// Bad
{
  "compilerOptions": {
    "disableSizeLimit": false
  }
}
```
<!-- prettier-ignore-end -->

### Downlevel Iteration

The compiler's option should be `true`. (`compilerOptions.downlevelIteration`)

> **Why?** Provides better support for iterables in `for-of`, `spread`, and `destructuring` when
> targeting ES5 or lower.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "downlevelIteration": true
  }
}

// Bad
{
  "compilerOptions": {
    "downlevelIteration": false
  }
}
```
<!-- prettier-ignore-end -->

### Emit BOM

The compiler's emit Byte Order Mark (BOM) option should be `false`. (`compilerOptions.emitBOM`)

> **Why?** It's unnecessary and doesn't add any value to your transpiled code.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "emitBOM": false
  }
}

// Bad
{
  "compilerOptions": {
    "emitBOM": true
  }
}
```
<!-- prettier-ignore-end -->

### Emit Declaration Only

The compiler's emit declaration only option should be `false`.
(`compilerOptions.emitDeclarationOnly`)

> **Why?** Generally if you need to emit only a declaration, the CLI should be used rather than the
> `tsconfig`.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "emitDeclarationOnly": false
  }
}

// Bad
{
  "compilerOptions": {
    "emitDeclarationOnly": true
  }
}
```
<!-- prettier-ignore-end -->

### Emit Decorator Metadata

The compiler's emit decorator metadata option should be `true` or `false` depending on your project
needs. (`compilerOptions.emitDecoratorMetadata`)

> **Why?** Enables support for [`reflect-metadata`](https://github.com/rbuckton/reflect-metadata).
> Feel free to disable if you have no plans to use this.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
}

{
  "compilerOptions": {
    "emitDecoratorMetadata": false
  }
}
```
<!-- prettier-ignore-end -->

### Es Module Interop

The compiler's ES module interop option should be `true`. (`compilerOptions.esModuleInterop`)

> **Why?** This makes your modules more compatible with Babel's interpretation of ES Modules.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}

// Bad
{
  "compilerOptions": {
    "esModuleInterop": false
  }
}
```
<!-- prettier-ignore-end -->

### Experimental Decorators

The compiler's experimental decorators option should be `true`.
(`compilerOptions.experimentalDecorators`)

> **Why?** We like to use the latest, cutting-edge features in our projects. If you're truly
> uncomfortable with this, you can disable it.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}

// Bad
{
  "compilerOptions": {
    "experimentalDecorators": false
  }
}
```
<!-- prettier-ignore-end -->

### Force Consistent Casing in File Names

The compiler's option should be `true`. (`compilerOptions.forceConsistentCasingInFileNames`)

> **Why?** While MacOS and Windows don't care about file name case, Linux does. By making sure that
> files are imported with the proper casing, wee can be sure that files will be imported properly
> regardless of operating system.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}

// Bad
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": false
  }
}
```
<!-- prettier-ignore-end -->

### Import Helpers

The compiler's import helpers option should be `true`. (`compilerOptions.`)

> **Why?** This leverages `tslib` and makes your final outputted code smaller.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "importHelpers": true
  }
}

// Bad
{
  "compilerOptions": {
    "importHelpers": false
  }
}
```
<!-- prettier-ignore-end -->

### Incremental Compilation

The compiler's incremental option should be set to `false`. (`compilerOptions.incremental`)

> **Why?** We've seen this break builds on occasion, especially when combining webpack builds with
> server applications. Until this feature is more stable, we recommend disabling it.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "incremental": false
  }
}

// Bad
{
  "compilerOptions": {
    "incremental": true
  }
}
```
<!-- prettier-ignore-end -->

### Inline Source Map

The compiler's inline source map option should be `false`. (`compilerOptions.inlineSourceMap`)

> **Why?** We like to have a source map file for each ts file, rather than one big file for your
> entire project. Disabling this keeps your transpiled files clean and your code size small.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "inlineSourceMap": false
  }
}

// Bad
{
  "compilerOptions": {
    "inlineSourceMap": true
  }
}
```
<!-- prettier-ignore-end -->

### Inline Sources

The compiler's inline sources option should be `false`. (`compilerOptions.inlineSources`)

> **Why?** `inlineSources` has `inlineSourceMap` as a prerequisite which we recommend you disable.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "inlineSources": false
  }
}

// Bad
{
  "compilerOptions": {
    "inlineSources": true
  }
}
```
<!-- prettier-ignore-end -->

### Isolated Modules

The compiler's isolated modules option should be `true`. (`compilerOptions.isolatedModules`)

> **Why?** This performs additional safety checks on things such as `transpileModule`.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "isolatedModules": true
  }
}

// Bad
{
  "compilerOptions": {
    "isolatedModules": false
  }
}
```
<!-- prettier-ignore-end -->

### JSX

The compiler's JSX option should be `react` if your project is using React, (or `react-native` if
your project is using React Native) otherwise you can leave this option `undefined`.
(`compilerOptions.jsx`)

> **Why?** This is required for any React project, otherwise JSX won't work as expected.

<!-- prettier-ignore-start -->
```JavaScript
// Good if project uses React and JSX
{
  "compilerOptions": {
    "jsx": "react"
  }
}

// Good if project uses React Native and JSX
{
  "compilerOptions": {
    "jsx": "react-native"
  }
}

// Good if project doesn't use React / JSX
{
  "compilerOptions": {
  }
}
```
<!-- prettier-ignore-end -->

### JSX Factory

The compiler's JSX factory option should be `undefined`. (`compilerOptions.jsxFactory`)

> **Why?** Generally, this should remain undefined. If you need to set it you're probably doing
> something with React that's either super weird, or you shouldn't be doing.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "jsxFactory": "React.createElement"
  }
}
```
<!-- prettier-ignore-end -->

### Keyof Strings Only

The compiler's keyof strings only option should be `true`. (`compilerOptions.keyofStringsOnly`)

> **Why?** This forces keyOf to use TypeScript 2.9+ behavior, keeping with our "bleeding edge"
> mindset.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "keyofStringsOnly": true
  }
}

// Bad
{
  "compilerOptions": {
    "keyofStringsOnly": false
  }
}
```
<!-- prettier-ignore-end -->

### Lib

The compiler's lib option should always include `esnext` - anything else is project dependent.
(`compilerOptions.lib`)

> **Why?** We always want to use the latest bleeding edge features, which is why be default we like
> to import the `esnext` lib. Anything else you need to add (such as `dom` for working with
> browsers) is entirely project-based.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "lib": ["esnext", "dom"]
  }
}

// Bad
{
  "compilerOptions": {
    "lib": ["dom"]
  }
}
```
<!-- prettier-ignore-end -->

### List Emitted Files

The compiler's list emitted files option should be `false`. (`compilerOptions.listEmittedFiles`)

> **Why?** Enabling `listEmittedFiles` creates unnecessary noise in the console.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "listEmittedFiles": false
  }
}

// Bad
{
  "compilerOptions": {
    "listEmittedFiles": true
  }
}
```
<!-- prettier-ignore-end -->

### List Files

The compiler's list files option should be `false`. (`compilerOptions.listFiles`)

> **Why?** Listing file names in compilation adds noise to the console.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "listFiles": false
  }
}

// Bad
{
  "compilerOptions": {
    "listFiles": true
  }
}
```
<!-- prettier-ignore-end -->

### Map Root

The compiler's map root option should be `undefined`. (`compilerOptions.mapRoot`)

> **Why?** We think leaving the map root to the default generated directory is fine.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "mapRoot": {
  }
}

// Bad
{
  "compilerOptions": {
    "mapRoot": "./some-map-direectory"
  }
}
```
<!-- prettier-ignore-end -->

### Maximum Node Module JS Depth

The compiler's max node module JS depth option should be `undefined` in most cases.
(`compilerOptions.maxNodeModuleJsDepth`)

> **Why?** Generally the depth that TypeScript defaults (0) will be good enough for most projects,
> and going any deeper will cause slowdowns. Only change this if you absolutely need it.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "maxNodeModuleJsDepth": 1
  }
}
```
<!-- prettier-ignore-end -->

### Module

The compiler's module option should be `commonjs`. (`compilerOptions.module`)

> **Why?** Commonjs works best with both browsers and the current version of Node.js. As Node.js
> progresses, we may move to es2015 or esnext for node-only projects, but that isn't considered
> stable enough.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "module": "commonjs"
  }
}

// Bad
{
  "compilerOptions": {
    "module": "amd"
  }
}
```
<!-- prettier-ignore-end -->

### Module Resolution

The compiler's module resolution option should be `node`. (`compilerOptions.moduleResolution`)

> **Why?** The `node` module resolution strategy works with both node and Webpack, so we see no harm
> in making it default.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

// Bad
{
  "compilerOptions": {
    "moduleResolution": "classic"
  }
}
```
<!-- prettier-ignore-end -->

### New Line

The compiler's new line option should be `LF`. (`compilerOptions.newLine`)

> **Why?** This matches our commonly-used
> [Prettier config](https://github.com/kienleholdings/prettier).

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "newLine": "LF"
  }
}

// Bad
{
  "compilerOptions": {
    "newLine": "CRLF"
  }
}
```
<!-- prettier-ignore-end -->

### No Emit

The compiler's no emit option should be either `true` or `false` on a peer-project basis.
(`compilerOptions.noEmit`)

> **Why?** Most projects will want to leave this as true, however, if your project is using a module
> bundler (i.e. Webpack) only, there's no point in generating js files outside of the bundler.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noEmit": false
  }
}

// Good if you're using a module bundler
{
  "compilerOptions": {
    "noEmit": true
  }
}
```
<!-- prettier-ignore-end -->

### No Emit Helpers

The compiler's no emit helpers option should be `true`. (`compilerOptions.noEmitHelpers`)

> **Why?** When transpiling down to ES5, Typescript creates "helper" functions that do the fancy ES6
> things in ES5. The down side is that it creates these helpers on a per-file basis, which bloats
> your final code. By setting this to true, as well as setting `importHelpers` to true, we can
> reduce our final code size.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noEmitHelpers": true,
  }
}

// Bad
{
  "compilerOptions": {
    "noEmitHelpers": false
  }
}
```
<!-- prettier-ignore-end -->

### No Emit on Error

The compiler's no emit on error option should be `true`. (`compilerOptions.noEmitOnError`)

> **Why?** Imagine you run a build but there's an error, and then later somebody accidentally
> publishes that code, that's no good! By not emitting on error, you ensure that whatever is in your
> `lib` directory is error-free.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}

// Bad
{
  "compilerOptions": {
    "noEmitOnError": false
  }
}
```
<!-- prettier-ignore-end -->

### No Error Truncation

The compiler's option should be `true`. (`compilerOptions.noErrorTruncation`)

> **Why?** WHen debugging, you'll likely want to see the entire error message, not a truncated
> version.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noErrorTruncation": true
  }
}

// Bad
{
  "compilerOptions": {
    "noErrorTruncation": false
  }
}
```
<!-- prettier-ignore-end -->

### No Fallthrough Cases in Switch

The compiler's option should be `true`. (`compilerOptions.noFallthroughCasesInSwitch`)

> **Why?** This ensures that your `switch`es are clean and not accidentally running multiple cases
> with one case.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noFallthroughCasesInSwitch": true
  }
}

// Bad
{
  "compilerOptions": {
    "noFallthroughCasesInSwitch": false
  }
}
```
<!-- prettier-ignore-end -->

### No Implicit Any

The compiler's no implicit any option should be `true`. (`compilerOptions.noImplicitAny`)

> **Why?** Since we're using Typescript, we want every variable to have a type. Any should only be
> explicitly set, not inferred.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}

// Bad
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```
<!-- prettier-ignore-end -->

### No Implicit Returns

The compiler's no implicit returns option should be `true`. (`compilerOptions.noImplicitReturns`)

> **Why?** This rule helps make sure that you don't accidentally forget to return a value in your
> function if you've returned a value in another path in the same function (i.e. returning in an if
> but not an else).

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noImplicitReturns": true
  }
}

// Bad
{
  "compilerOptions": {
    "noImplicitReturns": false
  }
}
```
<!-- prettier-ignore-end -->

### No Implicit This

The compiler's no implicit this option should be `true`. (`compilerOptions.noImplicitThis`)

> **Why?** Basically the same reasoning as `noImplicitAny` - if you're gonna use TypeScript, you
> better be sure you're using Typescript.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noImplicitThis": true
  }
}

// Bad
{
  "compilerOptions": {
    "noImplicitThis": false
  }
}
```
<!-- prettier-ignore-end -->

### No Implicit Use Strict

The compiler's no implicit use strict option should be `false`.
(`compilerOptions.noImplicitUseStrict`)

> **Why?** Strict mode changes some silent errors in JavaScript to thrown errors, which helps you
> write cleaner code.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noImplicitUseStrict": false
  }
}

// Bad
{
  "compilerOptions": {
    "noImplicitUseStrict": true
  }
}
```
<!-- prettier-ignore-end -->

### No Lib

The compiler's no lib option should be `false`. (`compilerOptions.noLib`)

> **Why?** Unless you have an incredibly special case where you need to use the non-default
> Typescript library, we recommend leaving this `false`.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noLib": false
  }
}

// Bad
{
  "compilerOptions": {
    "noLib": true
  }
}
```
<!-- prettier-ignore-end -->

### No Resolve

The compiler's no resolve option should be `false`. (`compilerOptions.noResolve`)

> **Why?** When `noResolve` is true, the compiler will skip importing unresolved modules, rather
> than returning an error, which may lead to unexpected behavior.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noResolve": false
  }
}

// Bad
{
  "compilerOptions": {
    "noResolve": true
  }
}
```
<!-- prettier-ignore-end -->

### No Strict Generic Checks

The compiler's no strict generic checks option should be `false`.
(`compilerOptions.noStrictGenericChecks`)

> **Why?** We like to keep as much strict type checking enabled as possible, as long as it doesn't
> get in the way of development.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noStrictGenericChecks": false
  }
}

// Bad
{
  "compilerOptions": {
    "noStrictGenericChecks": true
  }
}
```
<!-- prettier-ignore-end -->

### No Unused Locals

The compiler's no unused locals option should be `true`. (`compilerOptions.noUnusedLocals`)

> **Why?** Having unused variables increases code size and can lead to unexpected errors.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noUnusedLocals": true
  }
}

// Bad
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```
<!-- prettier-ignore-end -->

### No Unused Parameters

The compiler's no unused parameters option should be `false`. (`compilerOptions.noUnusedParameters`)

> **Why?** Breaking our usual pattern here, having to use each function parameter gets very annoying
> during testing, so we'd rather keep that disabled.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "noUnusedParameters": false
  }
}

// Bad
{
  "compilerOptions": {
    "noUnusedParameters": true
  }
}
```
<!-- prettier-ignore-end -->

### Output Directory

The compiler's output directory option should be `./lib`. (`compilerOptions.outDir`)

> **Why?** We like to standardize and have all of our transpiled JavaScript in a `lib` folder for
> every project.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "outDir": "./lib"
  }
}

// Bad
{
  "compilerOptions": {
    "outDir": "./not-lib"
  }
}
```
<!-- prettier-ignore-end -->

### Output File

The compiler's output file option should be `undefined`. (`compilerOptions.outFile`)

> **Why?** For a very detailed article, check
> [this](https://basarat.gitbooks.io/typescript/docs/tips/outFile.html) out. It's a pretty good
> summary of why `outFile` is a bad idea.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "outFile": "./some-file.js"
  }
}
```
<!-- prettier-ignore-end -->

### Paths

The compiler's option should be `undefined` unless `baseUrl` is defined. (`compilerOptions.paths`)

> **Why?** This is useful with monorepos where you have node modules in more than one place, but
> otherwise not needed.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"]
    }
  }
}

// Bad
{
  "compilerOptions": {
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"]
    }
  }
}
```
<!-- prettier-ignore-end -->

### Plugins

The compiler's plugins option should be `undefined` unless you have any specific language plugins
you need to include. (`compilerOptions.plugins`)

> **Why?** Language service plugins are great for creating a better editor experience, but most
> users by default won't be using them.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Good if you have plugins
{
  "compilerOptions": [{
    "name": "Plugin Name",
    "type": "Plugin Type"
  }]
}
```
<!-- prettier-ignore-end -->

### Preserve Const Enums

The compiler's preserve const enums option should be `false`. (`compilerOptions.`)

> **Why?** Preserving const enums in the final code adds unnecessary file size to your final output.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "preserveConstEnums": false
  }
}

// Bad
{
  "compilerOptions": {
    "preserveConstEnums": true
  }
}
```
<!-- prettier-ignore-end -->

### Preserve Symbolic Links

The compiler's preserve symlinks option should be `false`. (`compilerOptions.preserveSymlinks`)

> **Why?** Symlinks are great, but they can easily vary from machine-to-machine. Because of this, we
> recommend keeping this false, so that in your final transpiled code, symlinks are displayed as
> full paths.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "preserveSymlinks": false
  }
}

// Bad
{
  "compilerOptions": {
    "preserveSymlinks": true
  }
}
```
<!-- prettier-ignore-end -->

### Preserve Watch Output

The compiler's preserve watch output option should be `false`.
(`compilerOptions.preserveWatchOutput`)

> **Why?** Keeping old watch output adds noise to the console, which may prevent you from spotting
> errors. We recommend keeping this false unless you like having a **very** verbose console.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "preserveWatchOutput": false
  }
}

// Bad
{
  "compilerOptions": {
    "preserveWatchOutput": true
  }
}
```
<!-- prettier-ignore-end -->

### Pretty

The compiler's pretty option should be `true`. (`compilerOptions.pretty`)

> **Why?** Colors are good for UX and help the developer spot things. We recommend keeping this
> enabled unless you're colorblind or just simply hate colors in your console.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "pretty": true
  }
}

// Bad
{
  "compilerOptions": {
    "pretty": false
  }
}
```
<!-- prettier-ignore-end -->

### React Namespace

The compiler's react namespace option should be `undefined`. (`compilerOptions.reactNamespace`)

> **Why?** Unless you really really need to change thee React namespace, we highly recommend leaving
> it default.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "reactNamespace": "Foo"
  }
}
```
<!-- prettier-ignore-end -->

### Remove Comments

The compiler's remove comments option should be `true`. (`compilerOptions.removeComments`)

> **Why?** Comments increase final code size. Comments are fine in your source files, but transpiled
> code really isn't meant to be read by a human anyway.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "removeComments": true
  }
}

// Bad
{
  "compilerOptions": {
    "removeComments": false
  }
}
```
<!-- prettier-ignore-end -->

### Resolve JSON Module

The compiler's resolve JSON module option should be `true`. (`compilerOptions.resolveJsonModule`)

> **Why?** This is especially helpful for server-side applications that need to import an
> auto-generated config, but don't want that config to be written in JavaScript.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}

// Bad
{
  "compilerOptions": {
    "resolveJsonModule": false
  }
}
```
<!-- prettier-ignore-end -->

### Root Directory

The compiler's root dir option should be `./src`. (`compilerOptions.rootDir`)

> **Why?** Wee like to keep all non-transpiled files (including tests) in a single `src` directory.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}

// Bad
{
  "compilerOptions": {
    "rootDir": "./not-src"
  }
}
```
<!-- prettier-ignore-end -->

### Root Directories

The compiler's root directories option should be `undefined`. (`compilerOptions.rootDirs`)

> **Why?** Because we're already setting `rootDir` to `./src`, we don't need any additional root
> directories. We think that all code should be exclusively in a single directory.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "rootDirs": ["./src", "./another-src"]
  }
}
```
<!-- prettier-ignore-end -->

### Skip Default Lib Check

The compiler's skip default lib check option should be `false`.
(`compilerOptions.skipDefaultLibCheck`)

> **Why?** `skipDefaultLibCheck` is deprecated.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "skipDefaultLibCheck": false
  }
}

// Bad
{
  "compilerOptions": {
    "skipDefaultLibCheck": true
  }
}
```
<!-- prettier-ignore-end -->

### Skip Lib Check

The compiler's skip lib check option should be `false`. (`compilerOptions.`)

> **Why?** For some reason this also checks `node_modules`, and not everyone publishes technically
> correct types to NPM. We leave this disabled until that's fixed.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}

// Bad
{
  "compilerOptions": {
    "skipLibCheck": false
  }
}
```
<!-- prettier-ignore-end -->

### Source Maps

The compiler's source map option should be `true`, but developers should take extra care to ensure
the `.map` files don't make it to packages, as they increase package size.
(`compilerOptions.sourceMap`)

> **Why?** Source maps are amazing tools for development, and should be generated as long as they
> aren't adding weight to your final package.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "sourceMap": true
  }
}

// Bad
{
  "compilerOptions": {
    "sourceMap": false
  }
}
```
<!-- prettier-ignore-end -->

### Source Root

The compiler's source root option should be `./src`. (`compilerOptions.sourceRoot`)

> **Why?** The source root option helps the debugger find your code. It should be set to the same
> directory that your source code is in.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "sourceRoot": "./src"
  }
}

// Bad
{
  "compilerOptions": {
    "sourceRoot": "./not-src"
  }
}
```
<!-- prettier-ignore-end -->

### Strict

The compiler's strict option should be `false`. (`compilerOptions.strict`)

> **Why?** This enables every strict option that TypeScript has to offer by default. Since we prefer
> customization, we like to keep this disabled.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "strict": false
  }
}

// Bad
{
  "compilerOptions": {
    "strict": true
  }
}
```
<!-- prettier-ignore-end -->

### Strict Bind Call Apply

The compiler's strict bind call apply option should be `true`.
(`compilerOptions.strictBindCallApply`)

> **Why?** This enabled more strict checking on `bind`, `call`, and `apply` functions.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "strictBindCallApply": true
  }
}

// Bad
{
  "compilerOptions": {
    "strictBindCallApply": false
  }
}
```
<!-- prettier-ignore-end -->

### Strict Function Types

The compiler's strict function types option should be `true`.
(`compilerOptions.strictFunctionTypes`)

> **Why?** This helps make sure that when you replace functions, the parameter types are consistent.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "strictFunctionTypes": true
  }
}

// Bad
{
  "compilerOptions": {
    "strictFunctionTypes": false
  }
}
```
<!-- prettier-ignore-end -->

### Strict Null Checks

The compiler's strict null checks option should be `true`. (`compilerOptions.strictNullChecks`)

> **Why?** This ensures that portions of your code aren't unintentionally null, resulting in
> unexpected bugs.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}

// Bad
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```
<!-- prettier-ignore-end -->

### Strict Property Initialization

The compiler's strict property initialization option should be `true`.
(`compilerOptions.strictPropertyInitialization`)

> **Why?** This ensures that non-undefined class properties are properly initialized in the
> constructor.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "strictPropertyInitialization": true
  }
}

// Bad
{
  "compilerOptions": {
    "strictPropertyInitialization": false
  }
}
```
<!-- prettier-ignore-end -->

### Strip Internal

The compiler's strip internal option should be `true`. (`compilerOptions.stripInternal`)

> **Why?** If a definition is explicitly marked `@internal`, this stops declarations from being
> generated. We set this to `true` as that is the expected behavior for Typescript.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "stripInternal": true
  }
}

// Bad
{
  "compilerOptions": {
    "stripInternal": false
  }
}
```
<!-- prettier-ignore-end -->

### Suppress Excess Property Errors

The compiler's suppress excess property errors option should be `false`.
(`compilerOptions.suppressExcessPropertyErrors`)

> **Why?** Suppressing errors, although more convenient for the developer, may lead to further
> errors down the line.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": false
  }
}

// Bad
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```
<!-- prettier-ignore-end -->

### Suppress Implicit Any Index Errors

The compiler's suppress implicit any index errors option should be `false`.
(`compilerOptions.suppressImplicitAnyIndexErrors`)

> **Why?** Suppressing errors, although more convenient for the developer, may lead to further
> errors down the line.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "suppressImplicitAnyIndexErrors": false
  }
}

// Bad
{
  "compilerOptions": {
    "suppressImplicitAnyIndexErrors": true
  }
}
```
<!-- prettier-ignore-end -->

### Target

The compiler's option is project-dependent. (`compilerOptions.target`)

> **Why?** If you want to support older browsers, you may want to use `es3`. If you want to support
> only `Node 10+`, you may want to use ES6. In general, we think either `es5` or `es6` will work as
> a default, but in the end, it depends on your project needs.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "target": "es5"
  }
}

{
  "compilerOptions": {
    "target": "es6"
  }
}

{
  "compilerOptions": {
    "target": "es3"
  }
}

{
  "compilerOptions": {
    "target": "esnext"
  }
}
```
<!-- prettier-ignore-end -->

### Trace Resolution

The compiler's trace resolution option should be `false`. (`compilerOptions.traceResolution`)

> **Why?** This adds unnecessary noise to the console.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "traceResolution": false
  }
}

// Bad
{
  "compilerOptions": {
    "traceResolution": true
  }
}
```
<!-- prettier-ignore-end -->

### Typescript Build Info File

The compiler's ts build info file option should be `undefined`. (`compilerOptions.tsBuildInfoFile`)

> **Why?** This option is dependent on `incremental` being true, which we recommend you keep
> disabled.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": {
    "tsBuildInfoFile": "some-file-name"
  }
}
```
<!-- prettier-ignore-end -->

### Type Roots

The compiler's type roots option should be `undefined`. (`compilerOptions.`)

> **Why?** Custom types should be manually specified in the `files` section of the config.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
  }
}

// Bad
{
  "compilerOptions": ["./types"]
}
```
<!-- prettier-ignore-end -->

### Types

The compiler's types option should contain an array of every type package you've imported from npm.
(`compilerOptions.types`)

> **Why?** THis makes sure ethe compiler can find all of your types. If you install @types/react,
> you'd want to have `"react" in your types array.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "types": ["node"] // If you're using node.js this is a good one to add
  }
}

// Good if you haven't imported any types
{
  "compilerOptions": {
    "types": []
  }
}
```
<!-- prettier-ignore-end -->

### Watch

The compiler's watch option should be `false`. (`compilerOptions.watch`)

> **Why?** Watching should only be done via the CLI's `--watch` parameter, not the config, as this
> can cause unexpected bugs when compiling and not knowing watch is turned on.

<!-- prettier-ignore-start -->
```JavaScript
// Good
{
  "compilerOptions": {
    "watch": false
  }
}

// Bad
{
  "compilerOptions": {
    "watch": false
  }
}
```
<!-- prettier-ignore-end -->

## Base Config

A base configuration file can be found [here](tsconfig.base.json).

## Extending the Base Config

Along with everything in the base config, you'll need to manually configure the following

- [`compilerOptions.baseUrl`](#base-url)
- [`compilerOptions.jsx`](#jsx)
- [`compilerOptions.lib`](#lib)
- [`compilerOptions.outDir`](#out-dir)
- [`compilerOptions.rootDir`](#root-dir)
- [`compilerOptions.sourceRoot`](#source-root)
- [`compilerOptions.target`](#target)
- [`compilerOptions.types`](#types)
- [`exclude`](#excluded-files)
- [`extends`](#monorepo-setup-extending-your-config)
- [`files`](#additional-typings)
- [`include`](#included-files)
