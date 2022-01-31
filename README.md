# dart-sass-importer

Compare `node-sass` with `dart-sass` to reveal differences with how custom importers are implemented.

## SASS file structure to test

```
📁 node-sass
    📄 index.scss
    📄 exists.scss
📁 dart-sass
    📄 index.scss
    📄 exists.scss
📁 nested
    📄 nested.scss
```  

### Import order

```
index.scss
  └── exists.scss
      └── ../nested/nested.scss
  └── missing.scss
```

## The test

### Methods under test

1. Node SASS `renderSync` when passing utf-8 formatted data
1. Node SASS `renderSync` when passing a file path
1. Dart SASS `renderSync` (legacy support) when passing utf-8 formatted data
1. Dart SASS `renderSync` (legacy support) when passing a file path
1. Dart SASS `compileString` when passing utf-8 formatted data
1. Dart SASS `compile` when passing a file path

### Observed differences

The numbers here correspond to the [methods under test](#methods-under-test) section above, and the table shows if each of the files pass through the sass custom reporter:

|                      | 1 | 2 | 3 | 4 | 5 | 6 |
|----------------------|---|---|---|---|---|---|
| exists.scss          | ✔️ | ✔️ | ✔️ | ❌ | ✔️ | ❌ |
| nested/nested.scss   | ✔️ | ✔️ | ❌ | ❌ | ❌ | ❌ |
| missing.scss         | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
