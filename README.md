# dart-sass-importer

Compare `node-sass` with `dart-sass` to reveal differences with how custom importers are implemented.

## SASS file structure to test

```
📁 node-sass
    📄 index.scss
    📄 exists.scss
    📄 alsoexists.scss
📁 dart-sass
    📄 index.scss
    📄 exists.scss
    📄 alsoexists.scss
📁 nested
    📄 nested.scss
```

## The test

### Methods under test

1. Node SASS `renderSync` when passing utf-8 formatted data
1. Node SASS `renderSync` when passing a file path
1. Dart SASS `renderSync` (legacy support) when passing utf-8 formatted data
1. Dart SASS `renderSync` (legacy support) when passing a file path
1. Dart SASS `compileString` when passing utf-8 formatted data
1. Dart SASS `compile` when passing a file path

### Test format

Each of the methods above are implemented in code, using the `index.scss` file from each of the folders as the SASS entrypoint (import order specified below). Each of the methods sets up a custom importer that logs the name of the imported file that is being passed through.

The file `missing.scss` does not exist. To stop an error being thrown this is intercepted by the custom importer and some SCSS data is returned.

#### Import order

```
index.scss
  └── exists.scss
      └── ../nested/nested.scss
  └── alsoexists.scss
  └── missing.scss
```

Tests for each method have been set up using Mocha, with the expected result being that ALL imports are passed through the custom importer. This includes:

1. Imports found in the main entrypoint
1. Any nested imports within those imports
1. Any imports that do not resolve to files on the system

To run the tests use `npm test`.

### Test results

The numbers here correspond to the [methods under test](#methods-under-test) section above, and the table shows if each of the files pass through the sass custom reporter:

|                      | 1 | 2 | 3 | 4 | 5 | 6 |
|----------------------|---|---|---|---|---|---|
| exists.scss          | ✔️ | ✔️ | ✔️ | ❌ | ✔️ | ❌ |
| alsoexists.scss      | ✔️ | ✔️ | ✔️ | ❌ | ✔️ | ❌ |
| nested/nested.scss   | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| missing.scss         | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

#### Observations

1. The original `renderSync` method from `node-sass` passes ALL imports through the custom importer
1. Both the legacy `renderSync` and `compileString` methods from `dart-sass`, when having data passed to them, will pass through any imports within the entrypoint (even if they do not exist) but will ignore any nested imports.
1. Both the legacy `renderSync` and `compile` methods from `dart-sass`, when a file path is specified, will not pass through ANY imports unless they do not exist.
